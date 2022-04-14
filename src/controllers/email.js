import { v4 as uuidv4 } from 'uuid';
import EmailHelper from '../helpers/email';
import {
  confirmTemplate,
  resetPasswordTemplate,
} from '../helpers/email/templates';
import UserService from '../services/user.service';
import redis from '../database/redis';
import { generateToken } from '../helpers/token';
import ErrorResponse from '../utils/errorResponse';

const { findUser } = UserService;

class EmailController {
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
          return new Error(error.message);
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

  static sendResetPasswordEmail = async (req, res) => {
    try {
      const user = await UserService.findUser({ email: req.body.email });

      const payload = { user: { id: user.id } };
      const secret = process.env.TOKEN_SECRET + user.password;
      const duration = parseInt(process.env.EMAIL_TOKEN_EXPIRE, 10);

      const token = generateToken(payload, secret, duration);

      const authClient = {
        clientId: process.env.GOOGLE_MAIL_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAIL_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_MAIL_REDIRECT_URI,
        refreshToken: process.env.GOOGLE_MAIL_REFRESH_TOKEN,
      };

      await EmailHelper.sendEmail(
        authClient,
        process.env.EMAIL,
        req.body.email,
        resetPasswordTemplate(
          user.userName,
          `${process.env.HOST}/api/users/${user.id}/reset-password/${token}`
        )
      );
      return res.json({ message: 'Reset password email', token });
    } catch (error) {
      if (error.message === 'User not found') {
        return ErrorResponse.notFoundError(res, 'User not found');
      }
      return res.status(502).json({ error: error.message });
    }
  };
}

export default EmailController;
