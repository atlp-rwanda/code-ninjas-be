import express from 'express'
import verifyMiddleware from '../middlewares/auth'
import UserController from '../controllers/userController'
import UserValidation from '../validations/UserValidation'

import passport from 'passport'
const router = express.Router()

router.post('/register', UserValidation.verifyUser, UserController.createUser)
router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
)
router.get(
    '/auth/facebook/barefoot',
    passport.authenticate('facebook', {
        successRedirect: '/api/auth/google/success',
        failureRedirect: '/fail',
    })
)

router.get(
    '/0auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        successRedirect: '/api/auth/google/success',
    })
)
router.get('/auth/google/success', UserController.success)
router.get('/protected', verifyMiddleware, UserController.protected)

export default router