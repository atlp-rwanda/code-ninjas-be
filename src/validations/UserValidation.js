import Joi from 'joi';

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
}

export default UserValidation;
