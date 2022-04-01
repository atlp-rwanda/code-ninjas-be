import { config } from 'dotenv';
import userServices from '../services/user';
import successRes from '../utils/successResponse';
import ErrorResponse from '../utils/errorResponse';
import encryption from '../helpers/encryption';

config();

const duration = process.env.TOKEN_EXPIRE;

const { findUser } = userServices;
const { signToken, checkPassword } = encryption;

class Auth {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await findUser({ email });
      if (!foundUser) return ErrorResponse(res, 404, 'User Not found');
      const isMatch = checkPassword(password, foundUser.password);
      if (!isMatch) return ErrorResponse(res, 401, 'Invalid credentials');

      const token = await signToken(
        {
          id: foundUser.id,
          email: foundUser.email,
        },
        duration
      );
      return successRes(res, 200, 'User login successful :)', {
        token,
      });
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
}

export default Auth;
