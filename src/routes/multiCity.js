import express from 'express';
import multiCityController from '../controllers/multiCityTrip';
import { verifyAuth, checkRequester } from '../middlewares';
import tripRequestValidations from '../validations/tripValidations';

const router = express.Router();

router.post(
  '/multiCity/request',
  verifyAuth,
  checkRequester,
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
