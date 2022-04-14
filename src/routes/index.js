import { Router } from 'express';
import docs from '../swagger';
import authRoutes from './auth';
import usersRoutes from './user';

const router = Router();

router.use('/auth', authRoutes);
router.use('/docs', docs);
router.use('/users', usersRoutes);

export default router;
