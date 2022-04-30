import response from './utils/responses';

export default {
  '/api/comments': {
    post: {
      summary: 'Adds a comment',
      tags: ['Comments'],
      description: 'A user can add a comment to a travel request',
      parameters: [{ $ref: '#/components/parameters/id' }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                comment: {
                  type: 'string',
                  example: 'I will always remember this place',
                },
              },
            },
          },
        },
      },
      responses: {
        200: response('Successfully added a comment', {
          message: { type: 'string', example: 'Comment added' },
        }),
      },
    },
    get: {
      summary: 'Gets all comments',
      tags: ['Comments'],
      description: 'An admin can view all comments of a travel request',
      parameters: [{ $ref: '#/components/parameters/id' }],
      responses: {
        200: response('Successfully fetched all comments', {
          comment: {
            type: 'string',
            example: 'This hotel has the amazing food ever',
          },
        }),
      },
    },
  },
  delete: {
    summary: 'Delete a comment',
    tags: ['Comments'],
    description:
      'A user should be able to delete a comment of a travel request',
    parameters: [{ $ref: '#/components/parameters/id' }],
    responses: {
      200: response('Successfully deleted comment', {
        comment: {
          type: 'string',
          example: '...',
        },
      }),
    },
  },
};
