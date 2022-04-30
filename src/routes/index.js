import { Router } from 'express';
import docs from '../swagger';
import authRoutes from './auth';
import usersRoutes from './user';
import roles from './roles';
import commentRoutes from './comment';

const router = Router();

router.use('/roles', roles);
router.use('/docs', docs);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/comments', commentRoutes);

export default router;
