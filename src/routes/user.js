import { Router } from 'express';
import UserController from '../controllers/user';
import { EmailValidation } from '../validations';

const router = new Router();

const { validateEmail } = EmailValidation;
const { resendConfirmationEmail, verifyUser } = UserController;

router.get('/send/confirm/:email', validateEmail, resendConfirmationEmail);

router.get('/verify/:token', verifyUser);

export default router;
