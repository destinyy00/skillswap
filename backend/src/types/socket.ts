import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { User, Session } from '@prisma/client';

// User with Firebase auth info
export interface AuthenticatedSocket extends Socket {
  user: {
    uid: string;
    email: string;
  };
}

// Session request event payload
export interface SessionRequestPayload {
  toUserId: string;
  skillId: string;
  message: string;
  proposedTimes?: string[];
}

// Session update event payload
export interface SessionUpdatePayload {
  sessionId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  message?: string;
  scheduledTime?: string;
}

// Notification payload
export interface NotificationPayload {
  type: 'SESSION_REQUEST' | 'SESSION_UPDATE' | 'MESSAGE' | 'SYSTEM';
  title: string;
  message: string;
  data?: any;
}

// Enriched session with user data
export interface EnrichedSession extends Session {
  user: Partial<User>;
  host: Partial<User>;
}

// Socket server instance
export interface SocketServerInstance {
  io: Server;
  httpServer: HTTPServer;
}

// Socket connection error response
export interface SocketErrorResponse {
  error: string;
  status: number;
} 