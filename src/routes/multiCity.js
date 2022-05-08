import express from 'express';
import multiCityController from '../controllers/multiCityTrip';
import verifyAuth from '../middlewares/auth';
import tripRequestValidations from '../validations/tripValidations';

const router = express.Router();

router.post(
  '/multiCity/request',
  verifyAuth,
  tripRequestValidations.validateTrip,
  multiCityController.multiCityRequestAtrip
);

router.get(
  '/multiCity/request/:id',
  verifyAuth,
  multiCityController.GetsingleMultiCityRequestAtrip
);

router.get(
  '/multiCity/requests',
  verifyAuth,
  multiCityController.getAllMultiCityTripRequest
);

router.delete(
  '/multiCity/delete/request/:id',
  verifyAuth,
  multiCityController.deleteMultiCityTripRequest
);

export default router;
