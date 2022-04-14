import { verifyToken } from '../helpers/token';
import UserService from '../services/user.service';
import ErrorResponse from '../utils/errorResponse';

const verifyAuth = async (req, res, next) => {
  const token = req.header('Authorization') || req.params.token;
  if (!token) {
    return res
      .status(401)
      .send({ error: 'You are not allowed to access this page' });
  }
  try {
    const user = await UserService.findUser({ id: req.params.id });
    verifyToken(
      token,
      req.path.includes('reset-password')
        ? process.env.TOKEN_SECRET + user.password
        : process.env.TOKEN_SECRET
    );
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'User not found') {
      return ErrorResponse.notFoundError(res, 'User not found');
    }
    ErrorResponse.unauthenticatedError(res, error.message);
  }
};
export default verifyAuth;
