import { Router } from 'express';
import docs from '../swagger/index';
import users from './auth';

const router = Router();

router.use('/docs', docs);
router.use('/users', users);

export default router;
