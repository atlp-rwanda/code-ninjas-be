export default {
  '/api/rooms': {
    post: {
      tags: ['Rooms'],
      summary: 'Add a room',
      description: 'add a room to accommodation',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: [
                    'Single',
                    'Double',
                    'Triple',
                    'Quad',
                    'Queen',
                    'King',
                    'Studio',
                  ],
                },
                number: {
                  type: 'string',
                },
                price: {
                  type: 'number',
                },
                currency: {
                  type: 'string',
                },
                isAvailable: {
                  type: 'boolean',
                },
                accommodationId: {
                  type: 'integer',
                },
              },
            },
          },
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: [
                    'Single',
                    'Double',
                    'Triple',
                    'Quad',
                    'Queen',
                    'King',
                    'Studio',
                    'Twin',
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Room added to accommodation successfuly!',
        },
        500: {
          description: 'Server error!',
        },
      },
    },
  },
  '/api/rooms/{roomId}': {
    get: {
      tags: ['Rooms'],
      security: [],
      summary: 'This will retrieve a room with given ID',
      description: 'retrieve a single room ',
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          description: ' Enter a room ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'room retrieved successfully!',
        },
        404: {
          description: 'no room found with that ID',
        },
      },
    },
    patch: {
      tags: ['Rooms'],
      summary: 'uptade a room',
      description: 'update a room',
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          description: ' Enter a room ID',
          required: true,
          type: 'integer',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                },
                number: {
                  type: 'string',
                },
                price: {
                  type: 'integer',
                },
                currency: {
                  type: 'string',
                },
                isAvailable: {
                  type: 'boolean',
                },
                curraccommodationIdency: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Room updated successfuly!',
        },
        500: {
          description: 'Server error!',
        },
      },
    },
    delete: {
      tags: ['Rooms'],
      summary: 'This will delete a room with given ID',
      description: 'Delete a room',
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          descrpition: 'Please enter a room ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Room deleted Successfuly',
        },
        404: {
          description: 'Room not found',
        },
      },
    },
  },
};
