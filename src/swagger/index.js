import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import components from './components';
import authPaths from './auth.doc';
import userPaths from './user.doc';

const docrouter = Router();

const local = process.env.HOST;
const heroku = process.env.DB_CONNECT;

const paths = {
  ...authPaths,
  ...userPaths,
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
  ],
  paths,
  components,
};

docrouter.use('/', serve, setup(options));

export default docrouter;
