import Joi from 'joi';
import errorResponse from '../utils/errorResponse';

const profileCompleteSchema = Joi.object({
  dob: Joi.date().iso().required(),
  nationality: Joi.string().required(),
  gender: Joi.string().valid('male', 'female', 'prefer not say').required(),
  age: Joi.number().required().min(12).max(130).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
    'string.pattern.base':
      '{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
  }),
  preferredLanguage: Joi.string().required(),
  preferredCurrency: Joi.string().required(),
  department: Joi.string().required(),
  address: Joi.string().required(),
  lineManager: Joi.string(),
  phoneNumber: Joi.string().required().required(),
  maritalStatus: Joi.string().valid('Single', 'Married', 'Widowed').required(),
});
const profileUpdateSchema = Joi.object({
  dob: Joi.date().iso(),
  nationality: Joi.string(),
  gender: Joi.string().valid('male', 'female', 'prefer not say'),
  age: Joi.number().min(12).max(130).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
    'string.pattern.base':
      '{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
  }),
  preferredLanguage: Joi.string(),
  preferredCurrency: Joi.string(),
  department: Joi.string(),
  address: Joi.string(),
  lineManager: Joi.string(),
  phoneNumber: Joi.string(),
  maritalStatus: Joi.string().valid('Single', 'Married', 'Widowed'),
});

class profileValidation {
  static async validateComplete(req, res, next) {
    const { error } = profileCompleteSchema.validate(req.body);
    if (error) {
      console.log(error);
      return errorResponse(res, 400, `${error.message.replace(/["\\]/g, '')}`);
    }
    return next();
  }

  static async validateUpdate(req, res, next) {
    const { error } = profileUpdateSchema.validate(req.body);
    if (error) {
      return errorResponse.badRequestError(
        res,
        400,
        `${error.message.replace(/["\\]/g, '')}`
      );
    }
    return next();
  }
}

export default profileValidation;
