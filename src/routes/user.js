import { Router } from 'express';
import UserController from '../controllers/user';
import EmailController from '../controllers/email';
import profile from '../controllers/profile';
import userProfile from '../middlewares/profile';
import upload from '../helpers/multer';
import profileValidation from '../validations/profileValidation';
import { EmailValidation, NewPasswordValidation } from '../validations';
import { verifyAuth, checkSuperAdmin } from '../middlewares';

const router = new Router();

const { validateEmail } = EmailValidation;
const { verifyUser, inputNewPassword, setNewPassword, getAllUsers } =
  UserController;

const { resendConfirmationEmail, sendResetPasswordEmail } = EmailController;
const { getProfile, completeProfile, updateProfile } = profile;

router.get('/send/confirm/:email', validateEmail, resendConfirmationEmail);

router.get('/verify/:token', verifyAuth, verifyUser);

router.post('/send/forgot-password', validateEmail, sendResetPasswordEmail);

router.get('/reset-password/:token', verifyAuth, inputNewPassword);

router.get('/', verifyAuth, checkSuperAdmin, getAllUsers);

router.post(
  '/reset-password/:token',
  verifyAuth,
  NewPasswordValidation.validateNewPassword,
  setNewPassword
);

router.route('/profile').get(verifyAuth, getProfile);

router
  .route('/profile/complete')
  .put(
    verifyAuth,
    userProfile.isComplete,
    upload.single('image'),
    profileValidation.validateComplete,
    completeProfile
  );
router
  .route('/profile/update')
  .patch(
    verifyAuth,
    userProfile.isIncomplete,
    profileValidation.validateUpdate,
    upload.single('image'),
    updateProfile
  );

export default router;
