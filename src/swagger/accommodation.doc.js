import response from './utils/responses';

export default {
  '/api/accommodations/': {
    post: {
      tags: ['Accommodations'],
      summary: 'Create an accommodation',
      description: 'Create an accommodation',
      parameters: [],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/Accommodation',
            },
          },
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Accommodation',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Accommodation created successfuly!',
        },
        500: {
          description: 'Server error',
        },
      },
    },
    get: {
      tags: ['Accommodations'],
      security: [],
      summary: 'Get all accommodations',
      description: 'Get all accommodations',
      responses: {
        200: {
          description: 'All accommodations retrieved successfuly!',
        },
      },
    },
  },
  '/api/accommodations/{accommodationId}': {
    get: {
      tags: ['Accommodations'],
      security: [],
      summary: 'This will retrieve accommodation by ID',
      description: ' ',
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          description: ' Enter the accommodation ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Accommodation retrieved successfully!',
        },
        404: {
          description: 'no accommodation found with that ID',
        },
      },
    },
    patch: {
      tags: ['Accommodations'],
      summary: 'This will update the accommodation with given ID',
      description: ' ',
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          description: 'Enter accommodation ID in the path',
          required: true,
          type: 'integer',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Accommodation',
            },
          },
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/Accommodation',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Accommodation updated successfully!',
        },
        404: {
          description: 'accommodation with that ID not found',
        },
      },
    },
    delete: {
      tags: ['Accommodations'],
      summary: 'This will delete an accommodation with given ID',
      description: ' ',
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          descrpition: 'Please enter accommodation ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Accommodation deleted Successfuly',
        },
        404: {
          description: 'Accommodation not found',
        },
      },
    },
  },
  '/api/accommodations/{accommodationId}/rooms': {
    get: {
      tags: ['Accommodations'],
      security: [],
      summary: 'Get all rooms of an accammodation',
      description: 'get all rooms in a single accommodation',
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          description: ' Enter accommodation ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'All rooms retrieved successfuly!',
        },
      },
    },
  },
  '/api/accommodations/{id}/react': {
    get: {
      summary: 'Like/unlike to an accommodation',
      tags: ['Accommodations'],
      description: 'A user can like or dislike an accommodation based',
      parameters: [{ $ref: '#/components/parameters/id' }],
      responses: {
        200: response('Successfully changed like status', {
          message: { type: 'string', example: 'Like added' },
        }),
      },
    },
  },
  '/api/accommodations/{id}/likes': {
    get: {
      summary: 'Gets the total likes of an accommodation',
      tags: ['Accommodations'],
      security: [],
      description: 'A user can view the total likes of an accommodation',
      parameters: [{ $ref: '#/components/parameters/id' }],
      responses: {
        200: response('Successfully fetched all likes', {
          likes: { type: 'number', example: 45 },
        }),
      },
    },
  },
};
