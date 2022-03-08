import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import response from './response';

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.HOST_NAME;

const paths = {
  ...response,
};

const options = {
  definition: {
    info: {
      title: 'Barefoot Nomad',
      version: '1.0.0',
      description:
        'Barefoot Nomad - Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.',
    },
    host: process.env === 'production' ? heroku : local,
    basePath: '/api/v2',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['./routes/*.js'],
  tags: [{}],
  paths,
};

const specs = swaggerJsDoc(options);

docrouter.use('/', serve, setup(specs, { explorer: true }));

export default docrouter;
