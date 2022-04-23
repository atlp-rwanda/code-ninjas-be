import express from 'express';
import locationController from '../controllers/location';
import { verifyAuth, checkAdmin } from '../middlewares';

const router = express.Router();

router.post('/', verifyAuth, checkAdmin, locationController.createLocation);
router.get('/:locationId', locationController.getSingleLocation);
router.patch(
  '/:locationId',
  verifyAuth,
  checkAdmin,
  locationController.updateLocation
);
router.get('/:locationId/accommodations', locationController.getAccommodations);
router.delete(
  '/:locationId',
  verifyAuth,
  checkAdmin,
  locationController.deleteLocation
);

export default router;
