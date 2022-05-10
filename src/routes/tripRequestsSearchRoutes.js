import express from 'express';
import * as tripSearch from '../controllers/tripRequestsSearchController';
import * as validate from '../middlewares/searchParamsValidate';
import verifyAuth from '../middlewares/auth';
import { authorizeTripSearch } from '../middlewares/authorize';

const tripSearchRouter = express.Router();
tripSearchRouter.get(
  '/search/byKey',
  verifyAuth,
  authorizeTripSearch,
  validate.search,
  tripSearch.tripRequestSearch
);

export default tripSearchRouter;
