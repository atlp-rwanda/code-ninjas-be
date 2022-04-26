import { Router } from 'express';
import AccommodationController from '../controllers/accommodation';
import accommodationValidation from '../validations/accommodationValidation';
import { FeedbackValidation, RatingValidation } from '../validations';
import upload from '../helpers/multer';
import { verifyAuth, checkAdmin, checkRequester } from '../middlewares';

const router = new Router();

const { validateNewAccommodation, validateAccommodationUpdate } =
  accommodationValidation;

router.post(
  '/',
  verifyAuth,
  checkAdmin,
  upload.array('images', 5),
  validateNewAccommodation,
  AccommodationController.createAccommodation
);
router.get('/', AccommodationController.getAllAccommodations);
router.get('/:accommodationId', AccommodationController.getOneAccommodation);
router.patch(
  '/:accommodationId',
  verifyAuth,
  checkAdmin,
  upload.array('images', 5),
  validateAccommodationUpdate,
  AccommodationController.updateAccommodation
);
router.get('/:accommodationId/rooms', AccommodationController.getAllRooms);
router.delete(
  '/:accommodationId',
  verifyAuth,
  checkAdmin,
  AccommodationController.deleteAccommodation
);

router.get('/:id/react', verifyAuth, AccommodationController.updateLike);

router.get('/:id/likes', AccommodationController.getLikes);

router.post(
  '/:id/rates',
  verifyAuth,
  checkRequester,
  RatingValidation.validateRate,
  AccommodationController.addRate
);

router.get('/:id/rates', AccommodationController.getRates);

router.post(
  '/:id/createFeedback',
  verifyAuth,
  FeedbackValidation.validateFeedback,
  AccommodationController.addFeedback
);

router.get(
  '/:id/GetAllFeedbacks',
  verifyAuth,
  AccommodationController.getFeedbacks
);

router.patch(
  '/:id/updateFeedback',
  verifyAuth,
  FeedbackValidation.validateFeedback,
  AccommodationController.updateFeedback
);

router.delete(
  '/:id/deleteFeedback',
  verifyAuth,
  AccommodationController.deleteFeedback
);

export default router;
