import UserService from '../services/user.service';
import redis from '../database/redis';
import ErrorResponse from '../utils/errorResponse';
import Protection from '../helpers/encryption';
import { generateToken, verifyToken } from '../helpers/token';
import EmailController from './email';

const { createUser, checkUser, findUser } = UserService;

class UserController {
  static createUser = async (req, res) => {
    try {
      // check if a user is in the database
      const check = {
        email: req.body.email,
      };

      await checkUser(check);

      // Hash the Password
      const hashedPassword = Protection.hashPassword(req.body.password);

      const user = await createUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: hashedPassword,
      });

      // create and Assign a token
      const params = {
        user: { id: user.userId, username: user.userName, email: user.email },
      };

      const secret = process.env.TOKEN_SECRET;

      const duration = process.env.TOKEN_EXPIRE;

      const token = generateToken(params, secret, duration);

      // Send a confirmation email
      const email = await EmailController.sendConfirmationEmail(user.email);

      res.header('Authorization', `Bearer ${token}`);
      res.status(200).json({
        message: 'User created successfully',
        token,
        email,
      });
    } catch (error) {
      if (error.message === 'Found') {
        return res.status(409).json({ error: 'email already exists' });
      }
      res.status(500).json({ error: error.message });
    }
  };

  static verifyUser = async (req, res) => {
    try {
      const payload = verifyToken(req.params.token, process.env.TOKEN_SECRET);

      // verify that the token has not been used before
      const isValidToken = await redis.get(
        `${process.env.NODE_ENV}:${payload.tokenId}`,
        (error, result) => {
          if (error) return error.message;
          if (result === req.params.token) return result;
          return false;
        }
      );

      if (!isValidToken) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (isValidToken === req.params.token) {
        const user = await findUser({ id: payload.user.id });

        await user.update({ isVerified: true });

        // Destroy the token afterwards by removing from cache
        redis.del(`${process.env.NODE_ENV}:${payload.tokenId}`);

        return res.json({ message: 'Email verified!' });
      }
      res.status(500).json({ error: 'Internal server error' });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  };

  static inputNewPassword = async (req, res) => {
    try {
      return res.json({ message: 'Ready for new password input' });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static setNewPassword = async (req, res) => {
    try {
      const { user } = req;
      const password = Protection.hashPassword(req.body.password);
      await user.update({ password });
      res.json({ message: 'Password modified successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default UserController;
