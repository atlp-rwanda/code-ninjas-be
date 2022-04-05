import { Router } from 'express';
import auth from './auth';
import docs from '../swagger/index';

const router = Router();

router.use('/auth', auth);
router.use('/docs', docs);

export default router;
