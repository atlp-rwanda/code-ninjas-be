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
              accomodationId: 2,
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
};

export default tripPath;
