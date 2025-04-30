import express from 'express';
import { auth } from '../services/firebase';
import { emitSessionRequest, emitSessionUpdate } from '../socket';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Firebase auth middleware
const checkAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token format' });
    }
    
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    // Add user to request
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Types
interface SessionRequest {
  title: string;
  description?: string;
  hostId: string;
  dateTime: string;
  message?: string;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Get all sessions for the current user
router.get('/', checkAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const sessions = await prisma.session.findMany({
      where: {
        OR: [
          { userId: userId },
          { hostId: userId }
        ],
      },
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
          }
        },
        host: {
          select: {
            name: true,
            avatarUrl: true,
          }
        }
      }
    });
    
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Request a new session
router.post('/request', checkAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { title, description, hostId, dateTime, message }: SessionRequest = req.body;
    
    // Check if required fields are provided
    if (!title || !hostId || !dateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create session in database
    const session = await prisma.session.create({
      data: {
        title,
        description,
        dateTime: new Date(dateTime),
        status: 'PENDING',
        userId: userId,
        hostId: hostId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
          }
        },
        host: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
          }
        }
      }
    });
    
    // Emit socket event to notify host about the session request
    emitSessionRequest(hostId, userId, {
      session,
      message,
    });
    
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session request:', error);
    res.status(500).json({ error: 'Failed to create session request' });
  }
});

// Update session status
router.patch('/:sessionId/status', checkAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { status } = req.body;
    const userId = req.user.uid;
    
    // Validate status
    const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    // Get the session
    const existingSession = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    
    if (!existingSession) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Check if user is authorized to update (must be host or user)
    if (existingSession.hostId !== userId && existingSession.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this session' });
    }
    
    // Update the session
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: { status },
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
          }
        },
        host: {
          select: {
            name: true,
            avatarUrl: true,
          }
        }
      }
    });
    
    // Determine recipient (the other party)
    const recipientId = userId === existingSession.hostId 
      ? existingSession.userId 
      : existingSession.hostId;
    
    // Emit socket event to notify the other party about the status update
    emitSessionUpdate(recipientId, userId, {
      session: updatedSession,
      previousStatus: existingSession.status,
    });
    
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error('Error updating session status:', error);
    res.status(500).json({ error: 'Failed to update session status' });
  }
});

export default router; 