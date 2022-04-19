import redisClient from '../database/redis';
import generateRefresh from '../services/token';
import UserService from '../services/user.service';
import successRes from '../utils/successResponse';
import ErrorResponse from '../utils/errorResponse';
import encryption from '../helpers/encryption';

const duration = process.env.TOKEN_EXPIRE;

const { findUser } = UserService;
const { signToken, checkPassword } = encryption;

class Auth {
  static async login(req, res, next) {
    try {
      const foundUser = req.user;

      const user = { id: foundUser.id, email: foundUser.email };
      const accessToken = await signToken({ user }, duration);
      const refreshToken = await generateRefresh(user);
      return successRes(res.header('Authorization', accessToken), 200, {
        message: 'User login successful :)',
        accessToken,
        refreshToken,
      });
    } catch (err) {
      return ErrorResponse.internalServerError(res, err.message);
    }
  }

  static generateToken = async (req, res, next) => {
    try {
      const { id, email } = req.user;
      const user = { id, email };
      const accessToken = await signToken({ user }, duration);
      const refreshToken = await generateRefresh(user);
      return successRes(
        res.header('Authorization', `Bearer ${accessToken}`),
        200,
        'Token creation successful :)',
        {
          accessToken,
          refreshToken,
        }
      );
    } catch (err) {
      return ErrorResponse.internalServerError(
        res,
        'Oops! Error while creating token'
      );
    }
  };

  static async logout(req, res, next) {
    try {
      const decoded = req.user;
      await redisClient.del(decoded.toString());

      const { id } = decoded;
      const { token } = req;
      await redisClient.set(`Blacklisted_${id}`, token);

      return successRes(res, 200, { message: 'User logout successfully' });
    } catch (error) {
      return ErrorResponse.internalServerError(
        res,
        `Unable to log out user!! ${error.message}`
      );
    }
  }
}

export default Auth;
