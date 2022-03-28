import Joi from 'joi';

const userSchema = Joi.object({
  FirstName: Joi.string()
    .empty()
    .min(4)
    .max(20)
    .pattern(/^[a-zA-Z]/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain only characters from a to z.',
    }),
  LastName: Joi.string()
    .empty()
    .min(4)
    .max(20)
    .pattern(/^[a-zA-Z]/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain only characters from a to z.',
    }),
  UserName: Joi.string()
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
  Password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain atleast a number, a special character, an upper-case letter and longer than 8 characters',
    }),
  Email: Joi.string().required().email(),
});

class UserValidation {
  static verifyUser = (req, res, next) => {
    try {
      const value = userSchema.validate(req.body);
      if (value.error) {
        res.status(400).json({
          message: value.error.details[0].message.replace(/["'`]+/g, ''),
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(400).json({
        message:
          error.message ||
          error.message.replace(/["'`]+/g, '') ||
          'unexpected error occurred',
      });
    }
  };
}

export default UserValidation;
