import Joi from 'joi';
import ErrorResponse from '../utils/errorResponse';

const schema = Joi.string().required().messages({
  'any.required': '{{#label}} field is required',
  'string.base': '{{#label}} must be of type string',
  'string.empty': '{{#label}} can not be empty',
});

class CommentValidation {
  static validateComment = async (req, res, next) => {
    const { error } = schema.validate(req.body.comment);
    if (error) {
      return ErrorResponse.semanticError(
        res,
        `${error.message.replace(/["\\]/g, '')}`
      );
    }

    next();
  };
}

export default CommentValidation;
