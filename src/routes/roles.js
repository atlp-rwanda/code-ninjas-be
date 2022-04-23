import { Router } from 'express';
import UserController from '../controllers/user';
import UserValidation from '../validations/UserValidation';
import { verifyAuth, checkSuperAdmin } from '../middlewares';

const { verifyRoles } = UserValidation;
const { assignRoles } = UserController;

const router = Router();

router.post(
  '/assign/:id',
  verifyRoles,
  verifyAuth,
  checkSuperAdmin,
  assignRoles
);

export default router;
