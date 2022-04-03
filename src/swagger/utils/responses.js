const response = (description, properties) => {
  return {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties,
        },
      },
    },
    description,
  };
};

export default response;
