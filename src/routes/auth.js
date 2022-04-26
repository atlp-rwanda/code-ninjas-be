import { Router } from 'express';
import passport from 'passport';
import { UserValidation, LoginValidation } from '../validations';
import { verifyAuth, verifyLogin } from '../middlewares';
import authMiddleware from '../middlewares/token';
import UserController from '../controllers/user';
import googleController from '../controllers/GoogleSocialController';
import facebookController from '../controllers/FacebookSocialController';
import auth from '../controllers/auth';
import '../services/googlePassport';
import '../services/facebookPassport';

const { login, logout, generateToken } = auth;
const { verifyRefresh } = authMiddleware;

const router = Router();

router.post('/register', UserValidation.verifyUser, UserController.createUser);
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

router.post('/login', LoginValidation.validateLogin, verifyLogin, login);
router.get('/logout', verifyAuth, logout);
router.post('/token', verifyAuth, verifyRefresh, generateToken);

export default router;
