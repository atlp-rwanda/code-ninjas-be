import ErrorResponse from '../utils/errorResponse';
import encryption from '../helpers/encryption';
import UserService from '../services/user.service';

const { findUser } = UserService;

const { verifyToken } = encryption;
class profileValidation {
  static isIncomplete = async (req, res, next) => {
    try {
      const { user } = req;
      if (user.dataValues.isComplete === false) {
        return ErrorResponse.badRequestError(
          res,
          'Unable to update profile, please complete your profile first'
        );
      }
      next();
    } catch (err) {
      return next(
        new ErrorResponse.internalServerError(
          res,
          `Unable to perform action ${err.message}`
        )
      );
    }
  };

  static isComplete = async (req, res, next) => {
    try {
      const { user } = req;
      if (user.dataValues.isComplete === true) {
        return ErrorResponse.badRequestError(
          res,
          'Profile completed. Please try to  update instead'
        );
      }
      next();
    } catch (err) {
      return next(
        new ErrorResponse.internalServerError(
          res,
          `Unable to perform action ${err.message}`
        )
      );
    }
  };
}
export default profileValidation;
