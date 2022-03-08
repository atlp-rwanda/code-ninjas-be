import express from 'express';
import UserController from '../controllers/userController';
import UserValidation from '../validations/UserValidation';
const router = express.Router();

router.post('/register', UserValidation.verifyUser, UserController.createUser);

export default router;
