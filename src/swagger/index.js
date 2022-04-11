import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

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
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        description: 'Create users',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                FirstName: 'JaneD',
                LastName: 'DoeS',
                Email: 'newcheck@gmail.com',
                UserName: 'DoeS',
                Password: 'Password@2022',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'New User was created successfully',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/api/auth/social/login': {
      post: {
        tags: ['Authentication'],
        description:
          '<a href="/api/auth/google">login with google</a> | <a href="/api/auth/facebook">login with facebook</a>',
        parameters: [],
        requestBody: {},
        responses: {
          200: {
            description: 'Logged in successfully',
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        description: 'Login to Barefoot Nomad',
        parameters: [],
        security: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                email: 'you-email@gmail.com',
                password: 'your-password',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'User login successfully',
          },
          400: {
            description: 'Validation Error',
          },
          401: {
            description: 'Invalid credentials',
          },
          404: {
            description: 'User Not found',
          },
          500: {
            description: 'Oh No! Error while logging user :( ',
          },
        },
      },
    },
    '/api/auth/logout': {
      get: {
        tags: ['Authentication'],
        description: 'Logout from Barefoot Nomad',
        parameters: [],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {},
        responses: {
          200: {
            description: 'User logout successfully',
          },
          403: {
            description: 'Please sign in first',
          },
          500: {
            description: 'Unable to log out user',
          },
        },
      },
    },

    '/api/auth/token': {
      post: {
        tags: ['Authentication'],
        description: 'Generate new token',
        parameters: [],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                token: 'you-refresh-token',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Token creation successful',
          },
          401: {
            description: 'Invalid reuest! Unauthorised user.',
          },
          403: {
            description: 'Invalid request! Please sign in first',
          },
          500: {
            description: 'Unable to log out user',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the blog',
          },
          firstName: {
            type: 'string',
            description: "User's FirstName",
          },
          lastName: {
            type: 'string',
            description: "User's LastName",
          },
          username: {
            type: 'string',
            description: "User's UserName",
          },
          email: {
            type: 'string',
            description: "User's Email",
          },
          password: {
            type: 'string',
            description: "User's Password",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

docrouter.use('/', serve, setup(options));

export default docrouter;
