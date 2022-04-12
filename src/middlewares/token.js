import redis from '../database/redis';
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
        return ErrorResponse.unauthenticatedError(res, 'Please login first!');
      }

      const decoded = await verifyToken(token, secret);

      req.user = decoded.user;

      req.token = token;

      await redis.get(
        `Blacklisted_${decoded.user.id.toString()}`,
        (err, data) => {
          if (err) {
            return ErrorResponse.internalServerError(
              res,
              'Unable to perform action!'
            );
          }

          if (data === token) {
            return ErrorResponse.unauthenticatedError(res, 'Access denied');
          }

          next();
        }
      );
    } catch (err) {
      return next(
        new ErrorResponse.internalServerError(
          res,
          `Unable to verify user... ${err.message}`
        )
      );
    }
  };

  static verifyRefresh = async (req, res, next) => {
    try {
      const { token } = req.body;
      if (!token) {
        return ErrorResponse.badRequestError(res, 'Invalid request');
      }
      const decoded = await verifyRefresh(token, refresh);

      req.user = decoded.user;

      await redis.get(decoded.user.id.toString(), (err, data) => {
        if (err) {
          return ErrorResponse.internalServerError(
            res,
            `Internal server error ${err.message}`
          );
        }
        if (data === null) {
          return ErrorResponse.unauthenticatedError(
            res,
            'Invalid request, please sign in!'
          );
        }
        const userToken = JSON.parse(data);
        if (userToken.token !== token) {
          return ErrorResponse.unauthenticatedError(
            res,
            'Invalid request, Unauthorised user!'
          );
        }
        next();
      });
    } catch (err) {
      return next(
        new ErrorResponse.internalServerError(
          res,
          `Unable to generate token ${err}`
        )
      );
    }
  };
}

export default tokenValidation;
