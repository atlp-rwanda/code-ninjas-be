/* eslint-disable no-unreachable-loop */
import Joi from 'joi';
import errorResponse from '../utils/errorResponse';
import UserService from '../services/user.service';
import { isBeforeToday } from './dateValidator';
import models from '../database/models';

const { checkManager } = UserService;

const { User } = models;

const tripRequestSchema = Joi.object({
  managerId: Joi.number().integer().required(),
  departure_place: Joi.number().required(),
  destination: Joi.number().required(),
  departureDate: Joi.date().required(),
  returnDate: Joi.date().required(),
  travel_reason: Joi.string().required(),
  tripType: Joi.string().valid('one-way', 'return', 'multiCity'),
  accomodationId: Joi.number().required(),
});

class tripRequestValidations {
  static async validateTrip(req, res, next) {
    const wholeTrip = req.body;

    for (let i = 0; i < wholeTrip.length - 1; i += 1) {
      // check if manager exists

      const check = {
        id: wholeTrip[i].managerId,
        roleId: 2,
      };
      const managerExists = checkManager(check);
      if (!managerExists) {
        return res.status(400).json({ message: 'Manager does not Exist' });
      }
      // check if departure date is before today
      const result = isBeforeToday(wholeTrip[i].departureDate);
      result.then((backDated) => {
        if (backDated !== true) {
          return res.status(400).json({
            message: `Departure date must not be back dated`,
          });
        }
      });
      // check if return date is before departure date

      const { departureDate, returnDate } = wholeTrip[i];

      if (returnDate < departureDate) {
        return res.status(400).json({
          message: `Return date must not be before departure date`,
        });
      }
      // check if Departure date is before previous return date
      if (wholeTrip[i].returnDate > wholeTrip[i + 1].departureDate) {
        return res.status(400).json({
          message: `departure date (${
            wholeTrip[i + 1].departureDate
          }) must not be before return date(${
            wholeTrip[i].returnDate
          }) of previous trip`,
        });
      }

      // check if previous destination is the same as current departure place
      if (wholeTrip[i].destination !== wholeTrip[i + 1].departure_place) {
        return res.status(400).json({
          message: `destination (${
            wholeTrip[i].destination
          }) must be the same as departure place(${
            wholeTrip[i + 1].departure_place
          }) of next trip`,
        });
      }
      // departure place must not be the same as destination
      if (wholeTrip[i].departure_place === wholeTrip[i].destination) {
        return res.status(400).json({
          message: `Departure place must not be the same as destination`,
        });
      }
      // inputs validations
      const { error } = tripRequestSchema.validate(wholeTrip[i]);
      if (error) {
        return errorResponse.semanticError(
          res,
          `${error.message.replace(/["\\]/g, '')}`
        );
      }
    }
    return next();
  }
}

export default tripRequestValidations;
