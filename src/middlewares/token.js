import redis from '../database/redis';
import ErrorResponse from '../utils/errorResponse';
import { verifyToken } from '../helpers/token';

const secret = process.env.TOKEN_SECRET;
const refresh = process.env.REFRESH_SECRET;

class tokenValidation {
  static verifyRefresh = async (req, res, next) => {
    try {
      const { tokenId } = verifyToken(req.body.token, process.env.TOKEN_SECRET);

      const tokenKey = await redis.keys(`*${tokenId}`);
      const isValidToken = tokenKey.length > 0 && (await redis.get(tokenKey));

      if (isValidToken === req.body.token) {
        req.refreshTokenId = tokenId;
        return next();
      }
      return ErrorResponse.forbiddenError(res, 'Unauthorized');
    } catch (error) {
      if (error.status === 401) {
        return ErrorResponse.unauthenticatedError(res, error.message);
      }
      ErrorResponse.internalServerError(res, error.message);
    }
  };
}

export default tokenValidation;
