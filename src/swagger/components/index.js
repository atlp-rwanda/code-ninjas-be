import parameters from './parameters';
import schemas from './schemas';

const components = {
  ...schemas,
  ...parameters,
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

export default components;
