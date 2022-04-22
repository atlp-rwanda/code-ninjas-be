import { v4 as uuidv4 } from 'uuid';
import multiCityRequest from '../services/multiCity';
import ErrorResponse from '../utils/errorResponse';
import models from '../database/models';

const { TripRequest, Location, User, Accommodation, Country } = models;

const { createMultiCityRequest } = multiCityRequest;

class multiCityController {
  static multiCityRequestAtrip = async (req, res) => {
    const wholeTrip = req.body;
    const myuuid = uuidv4();
    const mapped = wholeTrip.map((trip) => ({
      ...trip,
      requesterId: req.user.id,
      multiCityTripId: myuuid,
    }));

    try {
      const tripCreated = await createMultiCityRequest(mapped);
      res.status(201).json({
        response: 'trip request created successfully',
        payload: tripCreated,
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static GetsingleMultiCityRequestAtrip = async (req, res) => {
    const { id } = req.params;
    try {
      const tripRequest = await TripRequest.findAll({
        where: { requesterId: req.user.id, multiCityTripId: id },
        include: [
          {
            model: Location,
            as: 'departurePlace',
            attributes: ['city'],
            include: {
              model: Country,
              as: 'Country',
              attributes: ['name'],
            },
          },
          {
            model: Location,
            as: 'Destination',
            attributes: ['city'],
            include: {
              model: Country,
              as: 'Country',
              attributes: ['name'],
            },
          },
          {
            model: User,
            as: 'manager',
            attributes: ['lastName', 'firstName', 'email'],
          },
          {
            model: Accommodation,
            as: 'Accommodation',
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'geoCoordinates',
                'locationId',
                'images',
                'amenities',
              ],
            },
            include: {
              model: Location,
              as: 'Location',
              attributes: ['city'],
            },
          },
        ],
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'requesterId',
            'accommodationId',
            'departure_place',
            'destination',
            'managerId',
          ],
        },
      });
      if (!tripRequest) {
        return ErrorResponse.notFoundError(res, 'trip request not found');
      }
      res.status(200).json({
        response: 'trip request found',
        payload: tripRequest,
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static getAllMultiCityTripRequest = async (req, res) => {
    try {
      const tripRequest = await TripRequest.findAll({
        where: { requesterId: req.user.id },
        include: [
          {
            model: Location,
            as: 'departurePlace',
            attributes: ['city'],
          },
          {
            model: Location,
            as: 'Destination',
            attributes: ['city'],
          },
          {
            model: User,
            as: 'manager',
            attributes: ['lastName', 'firstName', 'email'],
          },

          {
            model: Accommodation,
            as: 'Accommodation',
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'geoCoordinates',
                'locationId',
                'images',
                'amenities',
              ],
            },
            include: {
              model: Location,
              as: 'Location',
              attributes: ['city'],
            },
          },
        ],
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'requesterId',
            'accommodationId',
            'departure_place',
            'destination',
            'managerId',
          ],
        },
      });
      if (!tripRequest) {
        return ErrorResponse.notFoundError(res, 'no trip request found');
      }
      res.status(200).json({
        response: 'trip request found',
        payload: tripRequest,
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static deleteMultiCityTripRequest = async (req, res) => {
    const { id } = req.params;
    try {
      const tripRequest = await TripRequest.destroy({
        where: {
          requesterId: req.user.id,
          multiCityTripId: id,
          status: 'pending',
        },
      });
      if (!tripRequest) {
        return ErrorResponse.notFoundError(res, 'trip request not found');
      }
      res.status(200).json({
        response: 'trip request deleted successfully',
        payload: tripRequest,
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };
}

export default multiCityController;
