import { Router } from 'express';
import UserController from '../controllers/user';
import UserValidation from '../validations/UserValidation';
import superadminAuth from '../middlewares/superadminAuth';
import verifyAuth from '../middlewares/auth';

const { verifyRoles } = UserValidation;
const { checkAdmin } = superadminAuth;
const { assignRoles } = UserController;

const router = Router();

router.post('/assign/:id', verifyRoles, verifyAuth, checkAdmin, assignRoles);

export default router;
