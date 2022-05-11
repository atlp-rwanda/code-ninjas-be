import express from 'express';
import approveOrRejectController from '../controllers/approveOrRejectRequest';
import verifyAuth from '../middlewares/auth';
import { checkManager, checkRequester } from '../middlewares';

const router = express.Router();

router.patch(
  '/request/approve/:id',
  verifyAuth,
  checkManager,
  approveOrRejectController.approveTripRequest
);

router.patch(
  '/request/reject/:id',
  verifyAuth,
  checkManager,
  approveOrRejectController.rejectTripRequest
);
router.patch(
  '/request/multiCity/approve/:id',
  verifyAuth,
  checkManager,
  approveOrRejectController.approveMultiCityTripRequest
);

router.patch(
  '/request/multiCity/reject/:id',
  verifyAuth,
  checkManager,
  approveOrRejectController.rejectMultiCityTripRequest
);

export default router;
