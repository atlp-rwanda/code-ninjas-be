import { Router } from 'express';
import routeValidators from '../middlewares/validator';
import auth from '../controllers/auth';

const { loginValidate } = routeValidators;
const { login } = auth;

const router = Router();

router.route('/login').post(loginValidate, login);

export default router;
