import { Router } from 'express';
import authRoutes from './authRoutes';
import skillsRoutes from './skills';
import sessionsRoutes from './sessions';
import usersRoutes from './users';

const router = Router();

// Register routes
router.use('/skills', skillsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/users', usersRoutes);

// API Routes
router.use('/auth', authRoutes);

export default router; 