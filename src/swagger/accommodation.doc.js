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
        401: response('Unauthenticated user', {
          error: { type: 'string', example: 'Unauthorized' },
        }),
        404: response('Resource not found', {
          error: { type: 'string', example: 'Accommodation not found' },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Connection timeout' },
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
        404: response('Resource not found', {
          error: { type: 'string', example: 'Accommodation not found' },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Connection timeout' },
        }),
      },
    },
  },
  '/api/accommodations/{id}/rates': {
    post: {
      summary: 'Add a rate to an accommodation',
      tags: ['Accommodations'],
      description: 'A user can a rate to an accommodation from 0 to 5',
      parameters: [{ $ref: '#/components/parameters/id' }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: { rating: { type: 'number', example: 4.5 } },
            },
          },
        },
      },
      responses: {
        200: response('Successfully rated', {
          message: { type: 'string', example: 'Rate added' },
        }),
        401: response('Unauthenticated user', {
          error: { type: 'string', example: 'Unauthorized' },
        }),
        403: response('Non-requester user', {
          error: { type: 'string', example: 'Unauthorized access' },
        }),
        404: response('Resource not found', {
          error: { type: 'string', example: 'Accommodation not found' },
        }),
        422: response('Bad input', {
          error: {
            type: 'string',
            example: 'Enter either a full rate or half a rate',
          },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Connection timeout' },
        }),
      },
    },
    get: {
      summary: 'Gets the rating of an accommodation',
      tags: ['Accommodations'],
      security: [],
      description: 'A user can view the average rating of an accommodation',
      parameters: [{ $ref: '#/components/parameters/id' }],
      responses: {
        200: response('Successfully fetched all rates', {
          ratings: { type: 'string', example: '4.5' },
        }),
        404: response('Resource not found', {
          error: { type: 'string', example: 'Accommodation not found' },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Connection timeout' },
        }),
      },
    },
  },
  '/api/accommodations/{id}/createFeedback': {
    post: {
      summary: 'Add feedback to an accommodation',
      tags: ['Accommodations'],
      description: 'A user can give feedback to an accommodation',
      parameters: [{ $ref: '#/components/parameters/id' }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                feedback: {
                  type: 'string',
                  example: 'I love your customer care',
                },
              },
            },
          },
        },
      },
      responses: {
        200: response('Successfully added a feedback', {
          message: { type: 'string', example: 'Feedback added' },
        }),
      },
    },
  },
  '/api/accommodations/{id}/GetAllFeedbacks': {
    get: {
      summary: 'Gets all feedbacks of an accommodation',
      tags: ['Accommodations'],
      description: 'An admin can view all the feedbacks of an accommodation',
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
        200: response('Successfully fetched all feedbacks', {
          feedbacks: {
            type: 'string',
            example: 'This hotel has the amazing food ever',
          },
        }),
      },
    },
  },
  '/api/accommodations/{id}/updateFeedback': {
    patch: {
      summary: 'Update the feedback of an accommodation',
      tags: ['Accommodations'],
      description: 'A user can update the feedback of an accommodation',
      parameters: [{ $ref: '#/components/parameters/id' }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                feedback: {
                  type: 'string',
                  example: 'updated feedback',
                },
              },
            },
          },
        },
      },
      responses: {
        200: response('Successfully updated feedback', {
          message: { type: 'string', example: 'Feedback updated' },
        }),
      },
    },
  },
  '/api/accommodations/{id}/deleteFeedback': {
    delete: {
      summary: 'This will delete the feedback of an accommodation',
      tags: ['Accommodations'],
      description: 'An admin can delete the feedback of an accommodation',
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
          description: 'Feedback deleted Successfuly',
        },
        404: {
          description: 'Accommodation not found',
        },
      },
    },
  },
};
