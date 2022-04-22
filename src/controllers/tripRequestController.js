/* eslint-disable no-unused-expressions */
import { date } from 'joi';
import models from '../database/models';
import UserService from '../services/user.service';
import { isBeforeToday, isAfterDepartureDate } from '../helpers/dateValidator';
import isNumber from '../helpers/numberValidator';
import LocationService from '../services/location.service';
import ErrorResponse from '../utils/errorResponse';

const { checkManager } = UserService;

const { TripRequest, Accommodation, Location, User, Country } = models;

class tripController {
  static requestAtrip = async (req, res) => {
    const check = {
      id: req.body.managerId,
      roleId: 2,
    };
    const managerExists = await checkManager(check);
    if (!managerExists) {
      return res.status(400).json({ message: 'Manager does not Exist' });
    }
    const backDated = isBeforeToday(req.body.departureDate);
    if (backDated) {
      return res.status(400).json({
        message: `Departure date must not be back dated`,
      });
    }
    const ReturnDateValidator = isAfterDepartureDate(
      req.body.departureDate,
      req.body.returnDate
    );

    if (ReturnDateValidator !== true) {
      return res.status(400).json({
        message: `Return date must not be before departure date`,
      });
    }

    const departure = await LocationService.getSingleLocation(
      req.body.departure_place
    );
    if (!departure) {
      return ErrorResponse.notFoundError(res, 'departure place not found');
    }

    const destination_place = await LocationService.getSingleLocation(
      req.body.destination
    );
    if (!destination_place) {
      return ErrorResponse.notFoundError(res, 'destination place not found');
    }

    if (req.body.departure_place === req.body.destination) {
      return res.status(400).json({
        message: `Departure place must not be the same as destination`,
      });
    }

    const { user } = req;
    const reqId = user.id;
    const {
      managerId,
      departure_place,
      destination,
      departureDate,
      returnDate,
      travel_reason,
      accommodationId,
      status,
    } = req.body;

    const newTripRequest = {
      requesterId: reqId,
      managerId,
      departure_place,
      destination,
      departureDate,
      returnDate,
      travel_reason,
      accommodationId,
      status,
    };

    await TripRequest.create(newTripRequest)
      .then((data) => {
        res
          .status(201)
          .json({ response: 'trip request created successfully', data });
      })
      .catch((error) => {
        res.status(400).json({ response: error.message });
      });
  };

  static viewTripsByRequester = async (req, res) => {
    const { user } = req;
    await TripRequest.findAll({
      where: {
        requesterId: user.id,
      },
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
          'multiCityTripId',
        ],
      },
    })
      .then((data) => {
        res.json({ trips: data });
      })
      .catch((error) => {
        res.json({ response: error.message });
      });
  };

  static viiewSingleTrip = async (req, res) => {
    const { user } = req;
    const reqId = user.id;
    const { id } = req.params;
    const numValidator = await isNumber(req.params.id);

    if (numValidator !== true) {
      return res.status(400).json({ message: 'id must be a number' });
    }
    await TripRequest.findOne({
      where: {
        requesterId: reqId,
        id,
      },
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
          attributes: [
            'name',
            'description',
            'images',
            'amenities',
            'geoCoordinates',
            'type',
          ],
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
          'multiCityTripId',
        ],
      },
    })
      .then((data) => {
        data !== null
          ? res.json({ response: data })
          : res.status(404).json({ response: 'No trip found' });
      })
      .catch((error) => {
        res.json({ response: error.parent.detail });
      });
  };

  static viewSingleTripByManager = async (req, res) => {
    const { user } = req;
    const reqId = user.id;
    const { id } = req.params;
    const numberValidator = await isNumber(id);
    if (numberValidator !== true) {
      return res.status(400).json({ message: 'id must be a number' });
    }
    await TripRequest.findOne({
      where: {
        managerId: reqId,
        id,
      },
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
          as: 'requester',
          attributes: ['lastName', 'firstName', 'email'],
        },
        {
          model: Accommodation,
          as: 'Accommodation',
          attributes: [
            'name',
            'description',
            'images',
            'amenities',
            'geoCoordinates',
            'type',
          ],
          include: {
            model: Location,
            as: 'Location',
            attributes: ['city'],
            include: { model: Country, as: 'Country', attributes: ['name'] },
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
          'multiCityTripId',
        ],
      },
    })
      .then((data) => {
        data !== null
          ? res.json({ response: data })
          : res.status(404).json({ response: 'No trip found' });
      })
      .catch((error) => {
        res.json({ response: error.message });
      });
  };

  static viewTripsByManager = async (req, res) => {
    const { user } = req;
    await TripRequest.findAll({
      where: {
        managerId: user.id,
      },
      include: [
        {
          model: Location,
          as: 'departurePlace',
          attributes: ['city'],
        },
        { model: Location, as: 'Destination', attributes: ['city'] },
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
          'multiCityTripId',
        ],
      },
    })
      .then((data) => {
        res.json({ response: data });
      })
      .catch((error) => {
        res.json({ response: error.parent.detail });
      });
  };

  static deleteTripRequest = async (req, res) => {
    const { user } = req;
    const reqId = user.id;
    const { id } = req.params;
    const numberValidator = await isNumber(id);
    if (numberValidator !== true) {
      return res.status(400).json({ message: 'id must be a number' });
    }
    await TripRequest.destroy({
      where: {
        requesterId: reqId,
        status: 'pending',
        id,
      },
    })
      .then((data) => {
        // eslint-disable-next-line no-unused-expressions
        data > 0
          ? res.json({ response: 'Trip request deleted successfully' })
          : res.status(404).json({ response: 'Trip request not found' });
      })
      .catch((error) => {
        res.json({ response: error });
      });
  };

  static updateTripRequest = async (req, res) => {
    const { user } = req;
    const reqId = user.id;
    const { id } = req.params;
    const numberValidator = await isNumber(id);
    if (numberValidator !== true) {
      return res.status(400).json({ message: 'id must be a number' });
    }
    await TripRequest.update(req.body, {
      where: {
        requesterId: reqId,
        status: 'pending',
        id,
      },
    })
      .then((data) => {
        // eslint-disable-next-line no-unused-expressions
        data > 0
          ? res.json({ response: 'Trip request updated successfully' })
          : res.status(404).json({ response: 'Trip request not found' });
      })
      .catch((error) => {
        res.json({
          response: 'Ooops, something went wrong. trip request is not created',
        });
      });
  };
}
export default tripController;
