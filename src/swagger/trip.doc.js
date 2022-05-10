const tripPath = {
  '/api/trip/request': {
    post: {
      tags: ['Trip Request'],
      description: 'Create a trip request',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TripRequest',
            },
            example: {
              managerId: 34,
              departure_place: 1,
              destination: 2,
              departureDate: '2029-4-18',
              returnDate: '2029-4-29',
              travel_reason: 'visit mon',
              accommodationId: 2,
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Trip Request created successfully',
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

  '/api/trip/request/list': {
    get: {
      tags: ['Trip Request'],
      description: 'Get all trip requests for a user',
      summary: 'Get all trip requests for a user',
      parameters: [],
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Request created successfully',
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

  '/api/trip/request/{id}': {
    get: {
      tags: ['Trip Request'],
      description: 'Get single trip request for a user',
      summary: 'Get all single trip request for a user',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'trip request id',
        },
      ],

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Request created successfully',
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

  '/api/trip/request/{id}/manager': {
    get: {
      tags: ['Trip Request'],
      description: 'Get single trip request for a Manager',
      summary: 'Get all single trip request for Manager',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'trip request id',
        },
      ],

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Request created successfully',
        },
        400: {
          description: 'Bad Request',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Trip Not found',
        },
        500: {
          description: 'Oh No! Error while logging user :( ',
        },
      },
    },
  },

  '/api/trip/request/{id}/delete': {
    delete: {
      tags: ['Trip Request'],
      description: 'Get all trip requests',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'trip request id',
        },
      ],
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Request created successfully',
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

  '/api/trip/request/{id}/update': {
    patch: {
      tags: ['Trip Request'],
      description: 'update trip requests',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'trip request id',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TripRequest',
            },
            example: {
              destination: 'UGANDA',
              travel_reason: 'visit mon',
            },
          },
        },
        required: true,
      },

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Request created successfully',
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

  '/api/trip/request/list/manager': {
    get: {
      tags: ['Trip Request'],
      description: 'Get all trip requests for a manager',
      summary: 'Get all trip requests for a manager',

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Request created successfully',
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

  '/api/trip/{id}/Comment': {
    post: {
      summary: 'Add comment to a trip request',
      tags: ['Trip Request'],
      description: 'A user can add a comment to a trip request',
      parameters: [{ $ref: '#/components/parameters/id' }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                comment: {
                  type: 'string',
                  example: 'I hated the weather',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Comment added Successfully',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  '/api/trip/{id}/GetAllComments': {
    get: {
      summary: 'Gets all comments of a trip request',
      tags: ['Trip Request'],
      description: 'An admin can view all the comments of a trip request',
      parameters: [
        {
          name: 'id',
          in: 'path',
          descrpition: 'Please enter accommodation ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Comments fetched Successfully',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  '/api/trip/{id}/updateComment': {
    patch: {
      summary: 'Update the comment of a trip request',
      tags: ['Trip Request'],
      description: 'A user can update the comment of a trip request',
      parameters: [{ $ref: '#/components/parameters/id' }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                comment: {
                  type: 'string',
                  example: 'updated comment',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Comment updated Successfully',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  '/api/trip/{id}/deleteComment': {
    delete: {
      summary: 'This will delete the comment of a trip request',
      tags: ['Trip Request'],
      description: 'An admin can delete the comment of a trip request',
      parameters: [
        {
          name: 'id',
          in: 'path',
          descrpition: 'Please enter accommodation ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Comment deleted Successfully',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  '/api/trip/search/byKey?destination={searchValue}': {
    get: {
      tags: ['Trip Request Search'],
      description: 'Get trip request',
      summary: 'Get trip requests based on destination ',
      parameters: [
        {
          name: 'searchValue',
          in: 'path',
          required: true,
          description: 'Search Value',
        },
      ],

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Requests Searched and Found',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },

  '/api/trip/search/byKey?departure={searchValue}': {
    get: {
      tags: ['Trip Request Search'],
      description: 'Get trip request',
      summary: 'Get trip requests based on departure of the travelers ',
      parameters: [
        {
          name: 'searchValue',
          in: 'path',
          required: true,
          description: 'Search Value',
        },
      ],

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Requests Searched and Found',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },

  '/api/trip/search/byKey?currentStatus={searchValue}': {
    get: {
      tags: ['Trip Request Search'],
      description: 'Get trip request',
      summary: 'Get trip requests based on the current status of the request',
      parameters: [
        {
          name: 'searchValue',
          in: 'path',
          required: true,
          description: 'Search Value',
        },
      ],

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Requests Searched and Found',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },

  '/api/trip/search/byKey?departure={origin}&destination={destination}': {
    get: {
      tags: ['Trip Request Search'],
      description: 'Get trip request',
      summary: 'Get trip requests based on the origin and destination',
      parameters: [
        {
          name: 'origin',
          in: 'path',
          required: true,
          description: 'Travel departure',
        },
        {
          name: 'destination',
          in: 'path',
          required: true,
          description: 'Travel destination ',
        },
      ],

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Trip Requests Searched and Found',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Requests not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
};

export default tripPath;
