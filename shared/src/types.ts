// Define shared types between frontend and backend

export enum SessionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  timeZone?: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  userId: string;
  wantedById?: string;
  createdAt: string;
}

export interface Session {
  id: string;
  title: string;
  description?: string;
  dateTime: string;
  status: SessionStatus;
  userId: string;
  hostId: string;
  feedback?: string;
  rating?: number;
  createdAt: string;
} 