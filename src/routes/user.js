import { Router } from 'express';
import UserController from '../controllers/user';

const { getAllUsers } = UserController;

const router = Router();

router.get('/', getAllUsers);

export default router;
