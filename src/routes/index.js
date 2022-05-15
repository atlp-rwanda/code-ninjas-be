import { Router } from 'express';
import docs from '../swagger';
import authRoutes from './auth';
import usersRoutes from './user';
import roles from './roles';
import countryPaths from './country';
import locationsRoutes from './location';
import accommodationRoutes from './accommodation';
import roomsRoutes from './rooms';
import triprequest from './tripRequestRoute';
import tripStatistics from './tripStats';
import multiCity from './multiCity';
import approveOrRejectRequest from './approveOrRejectRequest';
import chatRoutes from './chats';

const router = Router();

router.use('/roles', roles);
router.use('/docs', docs);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/countries', countryPaths);
router.use('/locations', locationsRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/rooms', roomsRoutes);
router.use('/trip', triprequest);
router.use('/trip', multiCity);
router.use('/trip', tripStatistics);
router.use('/trip', approveOrRejectRequest);
router.use('/chats', chatRoutes);

export default router;
