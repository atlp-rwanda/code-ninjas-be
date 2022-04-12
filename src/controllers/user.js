import { v4 as uuidv4 } from 'uuid';
import UserService from '../services/user.service';
import redis from '../database/redis';
import Protection from '../helpers/encryption';
import { generateToken, verifyToken } from '../helpers/token';
import EmailHelper from '../helpers/email';
import confirmTemplate from '../helpers/email/templates';

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
      const email = await this.sendConfirmationEmail(user.email);

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

  static sendConfirmationEmail = async (email) => {
    const user = await findUser({ email });

    const secret = process.env.TOKEN_SECRET;
    const duration = parseInt(process.env.EMAIL_TOKEN_EXPIRE, 10);

    // Cache the verification token under a generated uuid key
    const tokenId = uuidv4();
    const data = { user: { id: user.id }, tokenId };
    const token = generateToken(data, secret, duration);

    await redis.set(
      `${process.env.NODE_ENV}:${tokenId}`,
      token,
      'EX',
      process.env.EMAIL_TOKEN_EXPIRE,
      (err, result) => {
        if (err) {
          throw new Error(error.message);
        }
      }
    );

    // initiate email sender auth
    const authClient = {
      clientId: process.env.GOOGLE_MAIL_CLIENT_ID,
      clientSecret: process.env.GOOGLE_MAIL_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_MAIL_REDIRECT_URI,
      refreshToken: process.env.GOOGLE_MAIL_REFRESH_TOKEN,
    };

    const result = await EmailHelper.sendEmail(
      authClient,
      process.env.EMAIL,
      email,
      confirmTemplate(`${process.env.HOST}/api/users/verify/${token}`)
    );

    if (result.envelope) {
      return { message: 'Confirm email', token, envelope: result.envelope };
    }
    return result;
  };

  static resendConfirmationEmail = async (req, res) => {
    try {
      await findUser({ email: req.params.email });

      const email = await this.sendConfirmationEmail(req.params.email);

      if (!email.envelope) {
        return res.status(502).json({ error: 'Bad Gateway' });
      }
      res.json(email);
    } catch (error) {
      res.status(404).json({ error: error.message });
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
}
export default UserController;
