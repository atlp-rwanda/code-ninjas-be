import { Router } from 'express';
import users from './user';
import auth from './auth';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

export default router;
