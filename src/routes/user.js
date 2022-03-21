import { Router } from 'express';
import UserController from '../controllers/user';
import UserValidation from '../validations/UserValidation';
import EmailValidation from '../middlewares/EmailValidation';

const router = Router();

router.post(
  '/register',
  UserValidation.verifyUser,
  EmailValidation.checkEmail,
  UserController.createUser
);

export default router;
