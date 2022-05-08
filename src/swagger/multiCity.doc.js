const multiCityPath = {
  '/api/trip/multiCity/request': {
    post: {
      tags: ['Trip Request'],
      description: 'Create multiple city trip request',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TripRequest',
            },
            example: [
              {
                managerId: 1,
                departure_place: 'kacyiru',
                destination: 'hello',
                departureDate: '2022-4-28',
                returnDate: '2022-4-28',
                travel_reason: 'visit mon',
                tripType: 'multiCity',
                accomodationId: 1,
              },
              {
                managerId: 1,
                departure_place: 'gisozi',
                destination: 'CHINA',
                departureDate: '2022-4-30',
                returnDate: '2022-4-31',
                travel_reason: 'visit mon',
                tripType: 'multiCity',
                accomodationId: 2,
              },
              {
                managerId: 1,
                departure_place: 'burundi',
                destination: 'CHINA',
                departureDate: '2022-4-27',
                returnDate: '2022-4-28',
                travel_reason: 'visit mon',
                tripType: 'multiCity',
                accomodationId: 3,
              },
            ],
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
  '/api/trip/multiCity/request/{id}': {
    get: {
      tags: ['Trip Request'],
      description: 'Get a single multi city trip request',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Trip Request ID',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Trip Request retrieved successfully',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Trip Request Not found',
        },
        500: {
          description: 'Oh No! Error while logging user :( ',
        },
      },
    },
  },
  '/api/trip/multiCity/requests': {
    get: {
      tags: ['Trip Request'],
      description: 'Get all multi city trip requests',
      parameters: [],
      responses: {
        200: {
          description: 'Trip Requests retrieved successfully',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Trip Requests Not found',
        },
        500: {
          description: 'Oh No! Error while logging user :( ',
        },
      },
    },
  },
  '/api/trip/multiCity/delete/request/{id}': {
    delete: {
      tags: ['Trip Request'],
      description: 'Delete a single multi city trip request',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Trip Request ID',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Trip Request deleted successfully',
        },
        400: {
          description: 'Validation Error',
        },
        401: {
          description: 'Invalid credentials',
        },
        404: {
          description: 'Trip Request Not found',
        },
        500: {
          description: 'Oh No! Error while logging user :( ',
        },
      },
    },
  },
};
export default multiCityPath;
