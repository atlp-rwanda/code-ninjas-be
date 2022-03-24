import responses from './response';

export const user = {
  '/auth/register': {
    post: {
      tags: ['Authentication'],
      summary: 'Create users',
      consumes: ['application/json'],
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'create user',
          required: true,
          schema: {
            $ref: '#/definitions/User',
          },
        },
      ],
      responses,
    },
  },
};

export const userDefinitions = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The auto-generated id of the user',
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
    example: {
      FirstName: 'JaneD',
      LastName: 'DoeS',
      Email: 'newcheck@gmail.com',
      UserName: 'DoeS',
      Password: 'Password@2022',
    },
  },
};
