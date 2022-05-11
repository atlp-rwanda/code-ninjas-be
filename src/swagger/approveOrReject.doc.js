const approveOrReject = {
  '/api/trip/request/approve/{id}': {
    patch: {
      tags: ['Trip Request'],
      description: 'Approve a trip request',
      summary: 'Approve trip request',
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

  '/api/trip/request/multiCity/approve/{id}': {
    patch: {
      tags: ['Trip Request'],
      description: 'Approve a multiCity trip request',
      summary: 'Approve multiCity trip request',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'multiCityId id',
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

  '/api/trip/request/reject/{id}': {
    patch: {
      tags: ['Trip Request'],
      description: 'reject a trip request',
      summary: 'Reject trip request',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'multiCity id',
        },
      ],

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
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

  '/api/trip/request/multiCity/reject/{id}': {
    patch: {
      tags: ['Trip Request'],
      description: 'reject a multiCity trip request',
      summary: 'Reject a multiCity trip request',
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

export default approveOrReject;
