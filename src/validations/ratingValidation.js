import Joi from 'joi';
import ErrorResponse from '../utils/errorResponse';

const schema = Joi.number().min(0).max(5).required();

export default class RatingValidation {
  static validateRate = (req, res, next) => {
    const { error } = schema.validate(req.body.rating);

    if (error) {
      return ErrorResponse.semanticError(
        res,
        error.message.replace(/["'\\]/g, '')
      );
    }

    const valueRounded = Math.round(req.body.rating * 2) / 2;
    if (parseFloat(req.body.rating) !== valueRounded) {
      return ErrorResponse.semanticError(
        res,
        'Enter either a full rate or half a rate'
      );
    }

    next();
  };
}
