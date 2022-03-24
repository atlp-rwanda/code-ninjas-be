import responses from './response';

export const auth = {
  '/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'Login to Barefoot Nomad',
      consumes: ['application/json'],
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'user login',
          required: true,
          schema: {
            $ref: '#/definitions/login',
          },
        },
      ],
      responses,
    },
  },
};

export const authDefinitions = {
  login: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: "User's email address",
        required: true,
      },
      password: {
        type: 'string',
        description: "User's password",
        required: true,
      },
    },
    example: {
      email: 'your-email@gmail.com',
      password: 'your-password',
    },
  },
};
