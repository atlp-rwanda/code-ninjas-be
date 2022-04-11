import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/user';
import UserValidation from '../validations/UserValidation';
import EmailValidation from '../middlewares/EmailValidation';
import authMiddleware from '../middlewares/token';
import googleController from '../controllers/GoogleSocialController';
import facebookController from '../controllers/FacebookSocialController';
import routeValidators from '../middlewares/validator';
import auth from '../controllers/auth';
import '../services/googlePassport';
import '../services/facebookPassport';

const { loginValidate } = routeValidators;
const { login, logout, generateToken } = auth;
const { verifyAccess, verifyRefresh } = authMiddleware;

const router = Router();

router.post(
  '/register',
  UserValidation.verifyUser,
  EmailValidation.checkEmail,
  UserController.createUser
);
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/auth/facebook/barefoot',
  passport.authenticate('facebook', { failureRedirect: '/failed' }),
  facebookController.onSuccessfb
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  googleController.onSuccess
);

router.get('/social/login', googleController.loginWithGoogle);

router.route('/login').post(loginValidate, login);
router.route('/logout').get(verifyAccess, logout);
router.route('/token').post(verifyRefresh, generateToken);

export default router;
