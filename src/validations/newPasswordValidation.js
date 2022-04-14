import Joi from 'joi';
import ErrorResponse from '../utils/errorResponse';
import Protection from '../helpers/encryption';

const schema = {
  newPassword: Joi.object().keys({
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
      .messages({
        'any.required': '{{#label}} field is required',
        'string.base': '{{#label}} must be of type string',
        'string.empty': '{{#label}} can not be empty',
        'string.pattern.base':
          '{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
      }),

    confirmPassword: Joi.valid(Joi.ref('password')).error(
      new Joi.ValidationError('Enter the same password')
    ),
  }),
};

const { newPassword } = schema;

class NewPasswordValidation {
  static validateNewPassword = (req, res, next) => {
    const { error } = newPassword.validate(req.body);
    if (error) {
      return ErrorResponse.semanticError(
        res,
        `${error.message.replace(/["\\]/g, '')}`
      );
    }

    if (Protection.checkPassword(req.body.password, req.user.password)) {
      return ErrorResponse.semanticError(
        res,
        'New password can not be the same as current password'
      );
    }

    return next();
  };
}

export default NewPasswordValidation;
