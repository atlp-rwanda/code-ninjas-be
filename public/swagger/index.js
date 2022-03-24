import response from './response';
import { auth, authDefinitions } from './auth.doc';
import { user, userDefinitions } from './user.doc';

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const paths = {
  ...auth,
  ...user,
  ...response,
};

const definitions = {
  ...authDefinitions,
  ...userDefinitions,
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
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  tags: [
    { name: 'Authentication', description: 'User authentication route' },
    { name: 'User', description: 'User route' },
  ],
  paths,
  definitions,
};

export default options;
