import redisClient from '../database/config/redis.config';
import userServices from '../services/user';
import generateRefresh from '../services/token';
import successRes from '../utils/successResponse';
import ErrorResponse from '../utils/errorResponse';
import encryption from '../helpers/encryption';

const secret = process.env.TOKEN_SECRET;
const duration = process.env.TOKEN_EXPIRE;

const { findUser } = userServices;
const { signToken, checkPassword } = encryption;

class Auth {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await findUser({ email });
      if (!foundUser) return ErrorResponse(res, 404, 'Invalid credentials');
      const isMatch = checkPassword(password, foundUser.password);
      if (!isMatch) return ErrorResponse(res, 401, 'Invalid credentials');
      const user = { id: foundUser.id, email: foundUser.email };
      const accessToken = await signToken({ user }, duration);
      const refreshToken = await generateRefresh(user);
      return successRes(
        res.header('Authorization', accessToken),
        200,
        'User login successful :)',
        {
          accessToken,
          refreshToken,
        }
      );
    } catch (err) {
      return next(
        new ErrorResponse(
          res,
          500,
          `Oh No! Error while logging user :( ${err.message}`
        )
      );
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
      return next(
        new ErrorResponse(res, 500, 'Oops! Error while creating token')
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

      return successRes(res, 200, 'User logout successfully');
    } catch (error) {
      return next(
        new ErrorResponse(res, 500, `Unable to log out user!! ${error}`)
      );
    }
  }
}

export default Auth;
