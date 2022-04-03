const userSchema = {
  User: {
    type: 'object',

    properties: {
      id: {
        type: 'string',
        description: 'The auto-generated id of the user',
      },
      firstName: {
        type: 'string',
        description: "User's FirstName",
      },
      lastName: {
        type: 'string',
        description: "User's LastName",
      },
      username: {
        type: 'string',
        description: "User's UserName",
      },
      email: {
        type: 'string',
        description: "User's Email",
      },
      password: {
        type: 'string',
        description: "User's Password",
      },
    },
  },
};

export default userSchema;
