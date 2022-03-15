import { Router } from 'express';
import UserController from '../controllers/user';
import UserValidation from '../validations/UserValidation';

const router = Router();

router.post('/register', UserValidation.verifyUser, UserController.createUser);

export default router;
