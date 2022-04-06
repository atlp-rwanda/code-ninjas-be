import express from 'express';
import tripController from '../controllers/tripRequestController';
import verifyAuth from '../middlewares/auth';
import tripRequestValidations from '../validations/singleCityValidator';
import { checkManager } from '../middlewares';

const router = express.Router();

router.post(
  '/request',
  verifyAuth,
  tripRequestValidations.validateTrip,
  tripController.requestAtrip
);
router.get('/request/list', verifyAuth, tripController.viewTripsByRequester);
router.get('/request/:id', verifyAuth, tripController.viiewSingleTrip);
router.get(
  '/request/list/manager',
  verifyAuth,
  checkManager,
  tripController.viewTripsByManager
);
router.get(
  '/request/:id/manager',
  verifyAuth,
  checkManager,
  tripController.viewSingleTripByManager
);
router.delete(
  '/request/:id/delete',
  verifyAuth,
  tripController.deleteTripRequest
);

router.patch(
  '/request/:id/update',
  verifyAuth,
  tripController.updateTripRequest
);
export default router;
