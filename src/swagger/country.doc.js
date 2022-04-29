import responses from './utils/responses';

export default {
  '/api/countries': {
    post: {
      summary: 'Add a country',
      tags: ['Countries'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Rwanda' },
              },
            },
          },
        },
      },
      responses: {
        200: responses('Successfully added a country', {
          message: { type: 'string', example: 'Country added' },
          country: {
            type: 'object',
            properties: { id: { type: 'integer' }, name: { type: 'string' } },
          },
        }),
      },
    },
    get: {
      summary: 'Get all countries',
      tags: ['Countries'],
      responses: {
        200: responses('Successfully fetched all countries', {
          countries: {
            type: 'array',
            items: {
              type: 'object',
              properties: { id: { type: 'integer' }, name: { type: 'string' } },
            },
          },
        }),
      },
    },
  },
};
