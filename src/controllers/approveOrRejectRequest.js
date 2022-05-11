import ErrorResponse from '../utils/errorResponse';
import models from '../database/models';

const { TripRequest, User } = models;

class approveOrRejectController {
  static approveMultiCityTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { status: 'approved' };

    try {
      const SingleTrip = await TripRequest.findOne({
        where: { managerId: req.user.id, multiCityTripId: id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.status === 'approved') {
        return res
          .status(401)
          .json({ response: 'trip has already been approved' });
      }
      if (SingleTrip.status === 'rejected') {
        return res
          .status(401)
          .json({ response: 'you can not approve rejected trip' });
      }
      await TripRequest.update(changeStatus, {
        where: {
          managerId: req.user.id,
          status: 'pending',
          multiCityTripId: id,
        },
      }).then((data) => {
        res.status(200).json({ response: 'request approved successfully' });
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static rejectMultiCityTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { status: 'rejected' };

    try {
      const SingleTrip = await TripRequest.findOne({
        where: { managerId: req.user.id, multiCityTripId: id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.status === 'rejected') {
        return res
          .status(401)
          .json({ response: 'trip has already been rejected' });
      }
      if (SingleTrip.status === 'approved') {
        return res
          .status(401)
          .json({ response: 'you can not reject approved trip' });
      }
      await TripRequest.update(changeStatus, {
        where: {
          managerId: req.user.id,
          status: 'pending',
          multiCityTripId: id,
        },
      }).then((data) => {
        res.status(200).json({ response: 'request rejected successfully' });
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static approveTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { status: 'approved' };

    try {
      const SingleTrip = await TripRequest.findOne({
        where: { managerId: req.user.id, id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.status === 'approved') {
        return res
          .status(401)
          .json({ response: 'trip has already been approved' });
      }
      if (SingleTrip.status === 'rejected') {
        return res
          .status(401)
          .json({ response: 'you can not approve rejected trip' });
      }
      await TripRequest.update(changeStatus, {
        where: {
          managerId: req.user.id,
          status: 'pending',
          id,
        },
      }).then((data) => {
        res.status(200).json({ response: 'request approved successfully' });
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };

  static rejectTripRequest = async (req, res) => {
    const { id } = req.params;
    const changeStatus = { status: 'rejected' };

    try {
      const SingleTrip = await TripRequest.findOne({
        where: { managerId: req.user.id, id },
      });
      if (!SingleTrip) {
        return res.status(404).json({ response: 'trip is not found' });
      }
      if (SingleTrip.status === 'rejected') {
        return res
          .status(401)
          .json({ response: 'trip has already been rejected' });
      }
      if (SingleTrip.status === 'approved') {
        return res
          .status(401)
          .json({ response: 'you can not reject approved trip' });
      }
      await TripRequest.update(changeStatus, {
        where: {
          managerId: req.user.id,
          status: 'pending',
          id,
        },
      }).then((data) => {
        res.status(200).json({ response: 'request rejected successfully' });
      });
    } catch (error) {
      return ErrorResponse.internalServerError(res, error.message);
    }
  };
}

export default approveOrRejectController;
