import redis from '../database/redis';
import { verifyToken } from '../helpers/token';
import UserService from '../services/user.service';
import ErrorResponse from '../utils/errorResponse';

const verifyAuth = async (req, res, next) => {
  const token = req.header('Authorization')
    ? req.header('Authorization').replace('Bearer ', '')
    : req.params.token;
  if (!token) {
    return ErrorResponse.unauthenticatedError(res, 'Access denied');
  }
  try {
    const { user, tokenId } = verifyToken(token, process.env.TOKEN_SECRET);

    const tokenKey = await redis.keys(`*${tokenId}`);
    const isValidToken = tokenKey.length > 0 && (await redis.get(tokenKey));

    if (isValidToken === token) {
      req.user = await UserService.findUser({ id: user.id });
      req.tokenId = tokenId;
      req.roleId = req.user.roleId;
      return next();
    }
    return ErrorResponse.unauthenticatedError(res, 'Unauthorized');
  } catch (error) {
    if (error.message === 'User not found') {
      return ErrorResponse.notFoundError(res, 'User not found');
    }
    if (error.status === 401) {
      return ErrorResponse.unauthenticatedError(res, error.message);
    }
    ErrorResponse.internalServerError(res, error.message);
  }
};
export default verifyAuth;
