import UserService from '../services/user.service';
import ErrorResponse from '../utils/errorResponse';
import Protection from '../helpers/encryption';

const verifyLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserService.findUser({ email });

    const isMatch = Protection.checkPassword(password, foundUser.password);

    if (!isMatch) {
      return ErrorResponse.notFoundError(res, 'Invalid credentials');
    }

    if (!foundUser.isVerified) {
      return ErrorResponse.forbiddenError(res, 'Unverified account');
    }

    req.user = foundUser;
    next();
  } catch (error) {
    if (error.message === 'User not found') {
      return ErrorResponse.notFoundError(res, 'Invalid credentials');
    }
    return ErrorResponse.internalServerError(res, error.message);
  }
};

export default verifyLogin;
