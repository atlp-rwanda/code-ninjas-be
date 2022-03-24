const responses = {
  200: {
    description: 'success',
  },
  201: {
    description: 'Created',
  },
  400: {
    description: 'Bad request',
  },
  401: {
    description: 'Not authenticated',
  },
  403: {
    description: 'Unauthorized',
  },
  404: {
    description: 'Not found',
  },
  409: {
    description: 'Conflicts',
  },
  500: {
    description: 'Server Error',
  },
};

export default responses;
