/* eslint-disable import/prefer-default-export */
import * as tripRequest from '../services/searchTripRequest';
import ErrorResponse from '../utils/errorResponse';
import * as roleService from '../services/rolesServices';
import successResponse from '../utils/successResponse';

const tripRequestSearch = async (req, res) => {
  if (req.query.departure && req.query.destination) {
    try {
      const { departure, destination } = req.query;
      const role = req.roleId;
      const findTrips = await tripRequest.searchByDepartureDestination(
        departure,
        destination,
        req.user.id,
        role
      );
      if (findTrips) {
        return successResponse(res, 200, {
          status: `Trip Requests fetched`,
          trips: findTrips,
        });
      }
      return res.status(404).json('Not Found');
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (req.query.destination) {
    try {
      const { destination } = req.query;
      const userRole = req.roleId;
      const findTrips = await tripRequest.searchByDestination(
        destination,
        userRole,
        req.user.id
      );
      if (findTrips) {
        return successResponse(res, 200, {
          status: `Trip Requests fetched`,
          trips: findTrips,
        });
      }
      return res.status(404).json('Not Found');
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (req.query.departure) {
    try {
      const userRole = req.roleId;
      const findTrips = await tripRequest.searchByDeparture(
        req.query.departure,
        req.user.id,
        userRole
      );
      if (findTrips) {
        return successResponse(res, 200, {
          status: `Trip Requests fetched`,
          trips: findTrips,
        });
      }
      return res.status(404).json('Not Found');
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  if (req.query.currentStatus) {
    try {
      const userRole = req.roleId;
      const findTrips = await tripRequest.searchByStatus(
        req.query.currentStatus,
        userRole,
        req.user.id
      );
      if (findTrips) {
        return successResponse(res, 200, {
          status: `Trip Requests fetched`,
          trips: findTrips,
        });
      }
      return res.status(404).json('Not Found');
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  return res.status(404).json('Not Found');
};

export { tripRequestSearch };
