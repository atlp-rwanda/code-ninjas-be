import { Router } from 'express';
import UserController from '../controllers/user';
import docs from '../swagger/index';
import users from './user';

const router = Router();

// Dummy route
router.get('/test', UserController.getAllUsers);

// Actual routes
router.use('/docs', docs);
router.use('/users', users);

export default router;
