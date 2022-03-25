import express from 'express';
import verifyMiddleware from '../middlewares/auth';
import googleController from '../controllers/GoogleSocialController';
import '../services/googlePassport';
import '../services/facebookPassport';
import tripController from '../controllers/requestTrip';

import passport from 'passport';
const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
    '/auth/facebook/barefoot',
    passport.authenticate('facebook', { failureRedirect: '/failed' }),
    googleController.onSuccess
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

router.get('/login', googleController.loginWithGoogle);

router.get('/trip/request', tripController.requestAtrip);

export default router;