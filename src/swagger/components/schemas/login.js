export default {
  Login: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: "User's email address",
        required: true,
      },
      password: {
        type: 'string',
        description: "User's password",
        required: true,
      },
    },
    example: {
      email: 'your-email@gmail.com',
      password: 'your-password',
    },
  },
};
