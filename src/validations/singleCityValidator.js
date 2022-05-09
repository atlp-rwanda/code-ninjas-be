import Joi from 'joi';
import errorResponse from '../utils/errorResponse';
import models from '../database/models';

const { User, Accommodation } = models;

const SingleTripRequestSchema = Joi.object({
  managerId: Joi.number().required(),
  departure_place: Joi.number().required(),
  destination: Joi.number().required(),
  departureDate: Joi.date().required(),
  returnDate: Joi.date().required(),
  travel_reason: Joi.string().required(),
  accommodationId: Joi.number().required(),
});

class tripRequestValidations {
  static async validateTrip(req, res, next) {
    try {
      const wholeTrip = req.body;

      // check if accommodation is in the same city with location
      const acc = await Accommodation.findOne({
        where: { id: wholeTrip.accommodationId },
      });

      if (!acc) {
        return errorResponse.notFoundError(res, 'Accommodation not found');
      }

      if (acc.locationId !== wholeTrip.destination) {
        return res.status(400).json({
          message: `Accommodation must be in destination city`,
        });
      }

      // departure place must not be the same as destination
      if (wholeTrip.departure_place === wholeTrip.destination) {
        return res.status(400).json({
          message: `Departure place must not be the same as destination`,
        });
      }
      // inputs validations
      const { error } = SingleTripRequestSchema.validate(wholeTrip);
      if (error) {
        return errorResponse.semanticError(
          res,
          `${error.message.replace(/["\\]/g, '')}`
        );
      }
    } catch (error) {
      errorResponse.internalServerError(res, error.message);
    }

    return next();
  }
}

export default tripRequestValidations;
