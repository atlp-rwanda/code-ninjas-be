import { Router } from 'express';
import UserController from '../controllers/user';
import EmailController from '../controllers/email';
import { EmailValidation, NewPasswordValidation } from '../validations';
import authMiddleware from '../middlewares/token';
import profileMiddleware from '../middlewares/auth';
import userProfile from '../middlewares/profile';
import profileValidation from '../validations/profileValidation';
import profile from '../controllers/profile';
import { verifyAuth } from '../middlewares';

const router = new Router();

const { validateEmail } = EmailValidation;
const { verifyUser, inputNewPassword, setNewPassword } = UserController;

const { resendConfirmationEmail, sendResetPasswordEmail } = EmailController;
// const { verifyAccess } = authMiddleware;
// const { verifyAuth } = profileMiddleware;
// const { resendConfirmationEmail, verifyUser } = UserController;
const { getProfile, completeProfile, updateProfile } = profile;

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
router
  .route('/profile')
  .get(verifyAuth, getProfile)
  .post(
    verifyAuth,
    userProfile.isComplete,
    profileValidation.validateComplete,
    completeProfile
  )
  .patch(
    verifyAuth,
    userProfile.isIncomplete,
    profileValidation.validateUpdate,
    updateProfile
  );

export default router;
