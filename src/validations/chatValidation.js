import Joi from 'joi';
import ErrorResponse from '../utils/errorResponse';

const chatSchema = Joi.string().required().messages({
  'any.required': '{{#label}} field is required',
  'string.base': '{{#label}} must be of type string',
  'string.empty': '{{#label}} can not be empty',
});

class ChatValidation {
  static validateChats = async (req, res, next) => {
    const { error } = chatSchema.validate(req.body.room, req.body.message);
    if (error) {
      return ErrorResponse.semanticError(
        res,
        `${error.message.replace(/["\\]/g, '')}`
      );
    }

    next();
  };
}

export default ChatValidation;
