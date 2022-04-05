import redis from '../database/config/redis.config';
import ErrorResponse from '../utils/errorResponse';
import encryption from '../helpers/encryption';

const { verifyToken, verifyRefresh } = encryption;

const secret = process.env.TOKEN_SECRET;
const refresh = process.env.REFRESH_SECRET;

class tokenValidation {
  static verifyAccess = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');

      if (!token) {
        return ErrorResponse(res, 401, 'Please login first!');
      }

      const decoded = await verifyToken(token, secret);

      req.user = decoded.user;

      req.token = token;

      await redis.get(
        `Blacklisted_${decoded.user.id.toString()}`,
        (err, data) => {
          if (err) {
            return ErrorResponse(res, 500, 'Unable to perform action!');
          }

          if (data === token) {
            return ErrorResponse(res, 401, 'Access denied');
          }

          next();
        }
      );
    } catch (err) {
      return next(
        new ErrorResponse(res, 500, `Unable to verify user... ${err.message}`)
      );
    }
  };

  static verifyRefresh = async (req, res, next) => {
    try {
      const { token } = req.body;
      if (!token) {
        return ErrorResponse(res, 400, 'Invalid request');
      }
      const decoded = await verifyRefresh(token, refresh);

      req.user = decoded.user;

      await redis.get(decoded.user.id.toString(), (err, data) => {
        if (err) {
          return ErrorResponse(
            res,
            500,
            `Internal server error ${err.message}`
          );
        }
        if (data === null) {
          return ErrorResponse(res, 401, 'Invalid request, please sign in!');
        }
        const userToken = JSON.parse(data);
        if (userToken.token !== token) {
          return ErrorResponse(res, 401, 'Invalid request, Unauthorised user!');
        }
        next();
      });
    } catch (err) {
      return next(new ErrorResponse(res, 500, 'Unable to generate token', err));
    }
  };
}

export default tokenValidation;
