import response from './utils/responses';

const paths = {
  '/api/users/send/confirm/{email}': {
    get: {
      tags: ['Users'],
      security: [],
      summary: 'Send a user verification email',
      description:
        "Creates a short time expiring token and wraps in a link that is sent to a user's provided email. Used to re-request an verification email",
      parameters: [{ $ref: '#/components/parameters/email' }],
      responses: {
        200: response('Successfully sent a verification email', {
          message: { type: 'string', example: 'Email sent!' },
          token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0Mn0sInRva2VuSWQiOiIwY2JjMGViOS0xNzM3LTQ2OTYtOTI5YS1jM2UwNjdhYWUxNjQiLCJpYXQiOjE2NDk2ODU3NjksImV4cCI6MTY0OTY4NjA2OX0.usQERHWL-zQhj3iTWMeDTPbrX-AM5NLzh3fNmAHzH7w',
          },
        }),
        400: response('Invalid email provided', {
          error: { type: 'string', example: 'value must be a valid email' },
        }),
        404: response('User not found', {
          error: { type: 'string', example: 'User not found' },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Failed to connect to DB' },
        }),
      },
    },
  },
  '/api/users/verify/{token}': {
    get: {
      tags: ['Users'],
      summary: 'Verifies a user account',
      security: [],
      description:
        "the link provided to a user's account will contain a token the shall update their status to verified once opened",
      parameters: [{ $ref: '#/components/parameters/token' }],
      responses: {
        200: response('Successfully updated a user account as verified', {
          message: { type: 'string', example: 'Email verified' },
        }),
        401: response('Token error', {
          error: { type: 'string', example: 'Unauthorized' },
        }),
      },
    },
  },
  '/api/users/send/forgot-password': {
    post: {
      summary: 'send a reset password email',
      description:
        'In case of a forgotten password, the user receives an email that shall redirect them to enter a new password',
      tags: ['Users'],
      security: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'object', example: 'newcheck@gmail.com' },
              },
            },
          },
        },
      },
      responses: {
        200: response('Succefully sent a reset password email', {
          message: { type: 'string', example: 'Reset password email' },
        }),
        400: response('Invalid email provided', {
          error: { type: 'string', example: 'value must be a valid email' },
        }),
        404: response('User not found', {
          error: { type: 'string', example: 'User not found' },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Failed to connect to DB' },
        }),
        502: response('Bad gateway', {
          error: { type: 'string', example: 'Email service failure' },
        }),
      },
    },
  },
  '/api/users/reset-password/{token}': {
    get: {
      summary: 'Opens a form to reset user password',
      description: 'Verifies the validiy of the link to reset the password',
      tags: ['Users'],
      security: [],
      parameters: [{ $ref: '#/components/parameters/token' }],
      responses: {
        200: response('Valid reset password link', {
          message: { type: 'string', example: 'Ready for new password input' },
        }),
        401: response('Invalid token', {
          error: { type: 'string', example: 'Invalid signature' },
        }),
        404: response('User not found', {
          error: { type: 'string', example: 'User not found' },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Failed to connect to DB' },
        }),
      },
    },
    post: {
      summary: 'Resets user password',
      description:
        'In case of a forgotten password, the user receives an email that shall redirect them to enter a new password',
      tags: ['Users'],
      security: [],
      parameters: [{ $ref: '#/components/parameters/token' }],
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/NewPassword' },
          },
        },
      },
      responses: {
        200: response('Succefully reset password', {
          message: { type: 'string', example: 'Reset password email' },
        }),
        401: response('Invalid token', {
          error: { type: 'string', example: 'Invalid signature' },
        }),
        404: response('User not found', {
          error: { type: 'string', example: 'User not found' },
        }),
        422: response('Invalid password provided', {
          error: { type: 'string', example: 'Enter the same password' },
        }),
        500: response('Internal server error', {
          error: { type: 'string', example: 'Failed to connect to DB' },
        }),
      },
    },
  },
};

export default paths;
