import express from 'express';
import tripController from '../controllers/tripRequestController';
import verifyAuth from '../middlewares/auth';
import tripRequestValidations from '../validations/singleCityValidator';
import { checkManager, checkRequester } from '../middlewares';
import { CommentValidation } from '../validations';

const router = express.Router();

router.post(
  '/request',
  verifyAuth,
  checkRequester,
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

router.post(
  '/:id/Comment',
  verifyAuth,
  CommentValidation.validateComment,
  tripController.addComment
);

router.get('/:id/GetAllComments', verifyAuth, tripController.getComments);

router.patch(
  '/:id/UpdateComment',
  verifyAuth,
  CommentValidation.validateComment,
  tripController.updateComment
);

router.delete('/:id/DeleteComment', verifyAuth, tripController.deleteComment);
export default router;
