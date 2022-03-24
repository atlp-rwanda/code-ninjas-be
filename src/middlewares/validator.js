/* eslint-disable require-jsdoc */
import schema from '../helpers/validator';
import ErrorResponse from '../utils/errorResponse';

const { login } = schema;

class RouteValidators {
  static loginValidate(req, res, next) {
    const { error } = login.validate(req.body);
    if (error) {
      return ErrorResponse(res, 400, `Validation error: ${error}`);
    }

    return next();
  }
}

export default RouteValidators;
