import { Router } from 'express';
import UserController from '../controllers/user';
import EmailController from '../controllers/email';
import { EmailValidation, NewPasswordValidation } from '../validations';
import { verifyAuth, checkSuperAdmin } from '../middlewares';

const router = new Router();

const { validateEmail } = EmailValidation;
const { verifyUser, inputNewPassword, setNewPassword, getAllUsers } =
  UserController;

const { resendConfirmationEmail, sendResetPasswordEmail } = EmailController;

router.get('/send/confirm/:email', validateEmail, resendConfirmationEmail);

router.get('/verify/:token', verifyAuth, verifyUser);

router.post('/send/forgot-password', validateEmail, sendResetPasswordEmail);

router.get('/reset-password/:token', verifyAuth, inputNewPassword);

router.post(
  '/reset-password/:token',
  verifyAuth,
  NewPasswordValidation.validateNewPassword,
  setNewPassword
);

router.get('/', verifyAuth, checkSuperAdmin, getAllUsers);

export default router;
