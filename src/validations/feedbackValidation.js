import Joi from 'joi';
import ErrorResponse from '../utils/errorResponse';

const schema = Joi.string().required().messages({
  'any.required': '{{#label}} field is required',
  'string.base': '{{#label}} must be of type string',
  'string.empty': '{{#label}} can not be empty',
});

class FeedbackValidation {
  static validateFeedback = async (req, res, next) => {
    const { error } = schema.validate(req.body.feedback);
    if (error) {
      return ErrorResponse.semanticError(
        res,
        `${error.message.replace(/["\\]/g, '')}`
      );
    }

    next();
  };
}

export default FeedbackValidation;
