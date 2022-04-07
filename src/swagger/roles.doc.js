const paths = {
  '/api/roles/assign/{id}': {
    post: {
      tags: ['Roles'],
      description: 'Assign Roles to a User',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User id',
        },
      ],

      requestBody: {
        content: {
          'application/json': {
            schema: {
              RoleId: 'string',
            },
            example: {
              RoleId: '1',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Role Updated Successfully',
        },
        400: {
          description: 'Validation Error',
        },
        403: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'User Not found',
        },
        500: {
          description: 'Oh No! Error while updating user role :( ',
        },
      },
    },
  },

  '/api/users': {
    get: {
      tags: ['Roles'],
      description: 'Get all Registered Users',
      parameters: [],
      responses: {
        200: {
          description: 'Users Retrived Successfully',
        },
        400: {
          description: 'Validation Error',
        },
        403: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'User Not found',
        },
        500: {
          description: 'Oh No! Error while updating user role :( ',
        },
      },
    },
  },
};

export default paths;
