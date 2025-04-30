import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../services/firebase';

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

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        offeredBy: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          }
        }
      }
    });
    
    res.status(200).json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Get user's offered skills
router.get('/offered', checkAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const skills = await prisma.skill.findMany({
      where: {
        userId: userId,
      },
      include: {
        offeredBy: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          }
        }
      }
    });
    
    res.status(200).json(skills);
  } catch (error) {
    console.error('Error fetching offered skills:', error);
    res.status(500).json({ error: 'Failed to fetch offered skills' });
  }
});

// Create a new skill
router.post('/', checkAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { name, category, description } = req.body;
    
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }
    
    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        description,
        userId,
      },
      include: {
        offeredBy: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          }
        }
      }
    });
    
    res.status(201).json(skill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

export default router; 