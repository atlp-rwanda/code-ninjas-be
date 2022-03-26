import express from 'express';
import verifyMiddleware from '../middlewares/auth';
import tripController from '../controllers/requestTrip';
const router = express.Router();

router.post('/trip/request', verifyMiddleware, tripController.requestAtrip);
router.get(
    '/trip/requester/view',
    verifyMiddleware,
    tripController.viewTripRequest_requester
);

export default router;