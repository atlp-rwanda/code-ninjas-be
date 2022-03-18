import { Router } from 'express';
import UserController from '../controllers/user';
import UserValidation from '../validations/UserValidation';
<<<<<<< HEAD
<<<<<<< HEAD
import EmailValidation from '../middlewares/EmailValidation';

const router = Router();

router.post(
  '/register',
  UserValidation.verifyUser,
  EmailValidation.checkEmail,
  UserController.createUser
);
=======

const router = Router();

router.post('/register', UserValidation.verifyUser, UserController.createUser);
>>>>>>> a10e5b2 (Rebase from Develop)
=======
import EmailValidation from '../middlewares/EmailValidation';

const router = Router();

router.post(
  '/register',
  UserValidation.verifyUser,
  EmailValidation.checkEmail,
  UserController.createUser
);
>>>>>>> 107db34 (Rebased from develop)

export default router;