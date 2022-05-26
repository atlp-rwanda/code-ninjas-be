import express from 'express';
import {
  tripStatistics,
  recentTripStatistic,
} from '../controllers/tripStatistics';
import verifyAuth from '../middlewares/auth';
import { staticsValidate, periodValidate } from '../validations/tripValidation';
import queryValidate from '../middlewares/queryValidate';

const router = express.Router();

router.get(
  '/statistics',
  queryValidate(staticsValidate),
  verifyAuth,
  tripStatistics
);
router.get(
  '/statistics/recent',
  queryValidate(periodValidate),
  verifyAuth,
  recentTripStatistic
);

export default router;
