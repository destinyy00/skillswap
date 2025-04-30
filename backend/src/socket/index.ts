import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { auth } from '../services/firebase';
import { DecodedIdToken } from 'firebase-admin/auth';

interface SocketData {
  uid: string;
  user: DecodedIdToken;
}

// Request payload for session events
interface SessionRequestPayload {
  toUserId: string;
  sessionData: any;
}

// Update payload for session status changes
interface SessionUpdatePayload {
  toUserId: string;
  update: any;
}

// Notification payload
interface NotificationPayload {
  toUserId: string;
  notification: {
    type: string;
    message: string;
    data?: any;
  };
}

let io: Server;

export const initializeSocketServer = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: Token missing'));
      }
      
      // Verify Firebase token
      const decodedToken = await auth.verifyIdToken(token);
      
      if (!decodedToken) {
        return next(new Error('Authentication error: Invalid token'));
      }
      
      // Store user data in socket
      (socket.data as SocketData) = {
        uid: decodedToken.uid,
        user: decodedToken,
      };
      
      console.log(`Socket authenticated: ${decodedToken.uid}`);
      next();
    } catch (error) {
      console.error('Socket authentication error:', error);
      next(new Error('Authentication error'));
    }
  });

  // Connection handling
  io.on('connection', (socket) => {
    const { uid } = socket.data as SocketData;
    
    console.log(`Socket connected: ${uid}`);
    
    // Join user to their private room
    socket.join(uid);
    
    // Handle session request
    socket.on('session:request', ({ toUserId, sessionData }: SessionRequestPayload) => {
      console.log(`Session request from ${uid} to ${toUserId}`);
      io.to(toUserId).emit('session:incoming', {
        fromUserId: uid,
        sessionData,
      });
    });
    
    // Handle session update
    socket.on('session:update', ({ toUserId, update }: SessionUpdatePayload) => {
      console.log(`Session update from ${uid} to ${toUserId}`);
      io.to(toUserId).emit('session:updated', {
        fromUserId: uid,
        update,
      });
    });
    
    // Handle notification
    socket.on('notification:send', ({ toUserId, notification }: NotificationPayload) => {
      console.log(`Notification from ${uid} to ${toUserId}`);
      io.to(toUserId).emit('notification:received', {
        fromUserId: uid,
        notification,
      });
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${uid}`);
    });
  });

  console.log('Socket.io server initialized');
  return io;
};

// Helper function to emit session request notification from the server (e.g., from controllers)
export const emitSessionRequest = (toUserId: string, fromUserId: string, sessionData: any) => {
  if (!io) {
    console.error('Socket server not initialized');
    return;
  }
  
  io.to(toUserId).emit('session:incoming', {
    fromUserId,
    sessionData,
  });
};

// Helper function to emit session update notification from the server
export const emitSessionUpdate = (toUserId: string, fromUserId: string, update: any) => {
  if (!io) {
    console.error('Socket server not initialized');
    return;
  }
  
  io.to(toUserId).emit('session:updated', {
    fromUserId,
    update,
  });
};

// Helper function to emit general notification from the server
export const emitNotification = (toUserId: string, notification: NotificationPayload['notification']) => {
  if (!io) {
    console.error('Socket server not initialized');
    return;
  }
  
  io.to(toUserId).emit('notification:received', {
    notification,
  });
};

// Export the Socket.io instance for use in other parts of the application
export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io server not initialized');
  }
  return io;
}; 