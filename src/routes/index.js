import { Router } from 'express';
import docs from '../swagger';
import authRoutes from './auth';
import usersRoutes from './user';
import roles from './roles';
import countryPaths from './country';
import locationsRoutes from './locationsRoutes';
import accommodationsRoutes from './accommodationsRoutes';
import roomsRoutes from './roomsRoutes';

const router = Router();

router.use('/roles', roles);
router.use('/docs', docs);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/countries', countryPaths);
router.use('/locations', locationsRoutes);
router.use('/accommodations', accommodationsRoutes);
router.use('/rooms', roomsRoutes);

export default router;
