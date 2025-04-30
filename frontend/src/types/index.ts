// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  timeZone?: string;
  credits: number;
}

// Skill types
export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  userId: string;
  offeredBy: User;
}

// Session types
export type SessionStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Session {
  id: string;
  title: string;
  description?: string;
  dateTime: string | Date;
  status: SessionStatus;
  userId: string;
  hostId: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  host: {
    name: string;
    avatarUrl?: string;
  };
  feedback?: string;
  rating?: number;
}

// Session request types
export interface SessionRequestData {
  skillId: string;
  date: Date;
  time: string;
  message: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
} 