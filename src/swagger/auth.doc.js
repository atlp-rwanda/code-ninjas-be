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
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
    },
  },
};
