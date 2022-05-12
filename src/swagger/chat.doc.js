const chatsPath = {
  '/api/chats': {
    post: {
      tags: ['Chats'],
      description: 'Create a chat message',
      summary: 'Create a chat message',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TripRequest',
            },
            example: {
              room: 'Barefoot Nomad',
              message: 'I hope you are all enjoying it here',
            },
          },
        },
        required: true,
      },
      responses: {
        201: {
          description: 'Message added successfully',
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

    get: {
      tags: ['Chats'],
      description: 'Get all chat messages',
      summary: 'Get all chat messages',
      parameters: [],
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Messages fetched successfully',
        },
        400: {
          description: 'Validation Error',
        },
        500: {
          description: 'Oh No! Error while logging user :( ',
        },
      },
    },
  },
};

export default chatsPath;
