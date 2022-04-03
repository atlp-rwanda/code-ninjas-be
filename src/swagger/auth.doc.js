import response from './utils/responses';

const authPaths = {
  '/api/auth/register': {
    post: {
      tags: ['Auth'],
      description: 'Create users',
      security: [],
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
            example: {
              firstName: 'Jane',
              lastName: 'Doe',
              email: 'newcheck@gmail.com',
              userName: 'DoeS',
              password: 'Password@2022',
            },
          },
        },
        required: true,
      },
      responses: {
        200: response('New User was created successfully', {
          message: { type: 'string', example: 'User created successfully' },
          token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImVtYWlsIjoibmV3Y2hlY2tAZ21haWwuY29tIiwiaWF0IjoxNjQ5NjU5Mjk4LCJleHAiOjE2NDk2NTkzOTh9.HZ2Sj_C0R-RlYMan25XvuIP9yULg0EMyhUTYA5PxAmM',
          },
          email: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Email sent!' },
              token: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0Mn0sInRva2VuSWQiOiIwY2JjMGViOS0xNzM3LTQ2OTYtOTI5YS1jM2UwNjdhYWUxNjQiLCJpYXQiOjE2NDk2ODU3NjksImV4cCI6MTY0OTY4NjA2OX0.usQERHWL-zQhj3iTWMeDTPbrX-AM5NLzh3fNmAHzH7w',
              },
              envelope: {
                type: 'object',
                properties: {
                  from: { type: 'string', example: 'ninjascode6@gmail.com' },
                  to: {
                    type: 'array',
                    items: { type: 'string', example: 'newcheck@gmail.com' },
                  },
                },
              },
            },
          },
        }),
        400: response('Invalid email', {
          error: {
            type: 'string',
            example: 'jane.doe@email.com is not a valid email',
          },
        }),
        409: response('Conflicting email', {
          error: { type: 'string', example: 'email already exists' },
        }),
        422: response('Failed validation', {
          error: { type: 'string', example: 'email is required' },
        }),
        500: response('Database service fail', { error: { type: 'string' } }),
      },
    },
  },
  '/api/auth/social/login': {
    post: {
      tags: ['Authentication'],
      security: [],
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
              email: 'newcheck@gmail.com',
              password: 'Password@2022',
            },
          },
        },
        required: true,
      },
      responses: {
        200: response('User login successful', {
          message: { type: 'string', example: 'User login successful :)' },
          token: { type: 'string' },
        }),
        403: response('Unauthorized access', {
          error: { type: 'string', example: 'Unverified account' },
        }),
        404: response('User not found', {
          error: { type: 'string', example: 'Invalid credentials' },
        }),
        422: response('Failed validation', {
          error: { type: 'string', example: 'Please fill all fields' },
        }),
        500: response('Internal server error', {
          error: {
            type: 'string',
            example: 'Oh No! Error while logging user :( ',
          },
        }),
      },
    },
  },
  '/api/auth/logout': {
    get: {
      tags: ['Authentication'],
      description: 'Logout from Barefoot Nomad',
      parameters: [],
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
};

export default authPaths;
