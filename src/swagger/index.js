import response from './response';
import { auth, authDefinitions } from './auth.doc';

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const paths = {
  ...auth,
  ...response,
};

const definitions = {
  ...authDefinitions,
};

const options = {
  swagger: '2.0',
  info: {
    title: 'Barefoot Nomad',
    version: '1.0.0',
    description:
      'Barefoot Nomad - Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.',
  },
  host: process.env === 'production' ? heroku : local,
  basePath: '/api/v2',
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  tags: [{ name: 'Authentication', description: 'User authentication route' }],
  paths,
  definitions,
};

// const specs = swaggerJsDoc(options);

// docrouter.use('/', serve, setup(specs, { explorer: true }));

export default options;
