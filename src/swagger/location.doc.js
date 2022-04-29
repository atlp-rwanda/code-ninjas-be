export default {
  '/api/locations': {
    post: {
      tags: ['Locations'],
      summary: 'Add a location',
      description: 'add a location ',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                city: { type: 'string', example: 'Kigali' },
                country: { type: 'string', example: 'Rwanda' },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Location added successfuly!',
        },
        500: {
          description: 'Server error!',
        },
      },
    },
  },

  '/api/locations/{locationId}': {
    get: {
      tags: ['Locations'],
      security: [],
      summary: 'This will retrieve a location with given ID',
      description: 'retrieve a single location ',
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          description: ' Enter a location ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'location retrieved successfully!',
        },
        404: {
          description: 'no location found with that ID',
        },
      },
    },
    patch: {
      tags: ['Locations'],
      summary: 'uptade a location',
      description: 'update a location',
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          description: ' Enter a location ID',
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
                city: { type: 'string', example: 'Gisenyi' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Location updated successfuly!',
        },
        500: {
          description: 'Server error!',
        },
      },
    },
    delete: {
      tags: ['Locations'],
      summary: 'This will delete a location with given ID',
      description: 'Delete a location',
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          descrpition: 'Please enter a location ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Location deleted Successfuly',
        },
        404: {
          description: 'Location not found',
        },
      },
    },
  },
  '/api/locations/{locationId}/accommodations': {
    get: {
      tags: ['Locations'],
      security: [],
      summary: 'This will retrieve accommodations in given location',
      description: ' ',
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          description: ' Enter the location ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Accommodations retrieved successfully!',
        },
        500: {
          description: 'Service failure',
        },
      },
    },
  },
};
