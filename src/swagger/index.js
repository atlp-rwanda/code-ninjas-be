import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import components from './components';
import authPaths from './auth.doc';
import userPaths from './user.doc';
import rolePaths from './roles.doc';
import countryPaths from './country.doc';
import locationPaths from './location.doc';
import roomPaths from './room.doc';
import accommodationPaths from './accommodation.doc';
import tripPath from './trip.doc';
import multiCityPath from './multiCity.doc';
import approveOrReject from './approveOrReject.doc';

const docrouter = Router();

const local = process.env.HOST;
const heroku = process.env.DB_CONNECT;

const paths = {
  ...authPaths,
  ...userPaths,
  ...rolePaths,
  ...countryPaths,
  ...locationPaths,
  ...accommodationPaths,
  ...roomPaths,
  ...tripPath,
  ...multiCityPath,
  ...approveOrReject,
};

const options = {
  openapi: '3.0.1',
  info: {
    title: 'Barefoot Nomad',
    version: '1.0.0',
    description:
      'Barefoot Nomad - Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.',
  },
  host: process.env === 'production' ? heroku : local,
  basePath: '/api',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: 'Auth', description: 'User authentication route' },
    { name: 'Users', description: 'User route' },
    { name: 'Roles', description: 'User Roles Route' },
  ],
  paths,
  components,
};

docrouter.use('/', serve, setup(options));

export default docrouter;
