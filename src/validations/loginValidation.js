import Joi from 'joi';
import ErrorResponse from '../utils/errorResponse';

const schema = {
  login: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Please fill all fields',
    }),

    password: Joi.string().required().trim().messages({
      'any.required': 'Please fill all fields',
    }),
  }),
};

const { login } = schema;

class LoginValidation {
  static validateLogin = async (req, res, next) => {
    const { error } = login.validate(req.body);
    if (error) {
      return ErrorResponse.semanticError(
        res,
        `${error.message.replace(/["\\]/g, '')}`
      );
    }
    return next();
  };
}

export default LoginValidation;
