import express from 'express';
import skillsRoutes from './skills';
import sessionsRoutes from './sessions';
import usersRoutes from './users';

const router = express.Router();

// Register routes
router.use('/skills', skillsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/users', usersRoutes);

export default router; 