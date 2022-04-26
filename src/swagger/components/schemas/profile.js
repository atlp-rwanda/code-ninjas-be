const profileSchema = {
  userProfile: {
    type: 'object',

    properties: {
      gender: { type: 'string', enum: ['male', 'female', 'prefer not say'] },
      dob: { type: 'string', format: 'date' },
      nationality: { type: 'string' },
      department: { type: 'string' },
      preferredLanguage: { type: 'string' },
      preferredCurrency: { type: 'string' },
      address: { type: 'string' },
      lineManager: { type: 'string' },
      phoneNumber: { type: 'string' },
      maritalStatus: { type: 'string', enum: ['Single', 'Married', 'Widowed'] },
      image: { type: 'string', format: 'binary' },
    },
  },
};

export default profileSchema;
