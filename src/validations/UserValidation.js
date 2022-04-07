import Joi from 'joi';
import { roleEntryValidation } from '../helpers/CheckUser';

const userSchema = Joi.object({
  firstName: Joi.string()
    .empty()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain only characters from a to z.',
    }),
  lastName: Joi.string()
    .empty()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain only characters from a to z.',
    }),
  userName: Joi.string()
    .empty()
    .min(4)
    .max(10)
    .pattern(/^[a-zA-Z]/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain only characters from a to z.',
    }),
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
  email: Joi.string().required().email(),
});

class UserValidation {
  static verifyUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };

  static verifyRoles = (req, res, next) => {
    try {
      const value = roleEntryValidation.validate(req.body);
      if (value.error) {
        res.status(422).json({
          message: value.error.details[0].message.replace(/["'`]+/g, ''),
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          error.message.replace(/["'`]+/g, '') ||
          'unexpected error occurred',
      });
    }
  };
}

export default UserValidation;
