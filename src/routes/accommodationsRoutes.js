import express from 'express';
import { verifyAuth, checkAdmin } from '../middlewares';
import accommodationValidation from '../validations/accommodationValidation';
import AccommodationController from '../controllers/accommodationsController';
import upload from '../helpers/multer';

const router = express.Router();

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

export default router;
