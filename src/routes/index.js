import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import docs from '../swagger/index';
import users from './user';
import auth from './auth';

const router = Router();

router.use('/auth', auth);
router.use('/docs', serve, setup(docs));
router.use('/users', users);

export default router;