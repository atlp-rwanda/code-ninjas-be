import { date, number } from 'joi';
import userSchema from './user';

const profileSchema = {
  userProfile: {
    ...userSchema.User,
    age: { type: 'number' },
    gender: { type: 'Enumerator' },
    dob: { type: 'date' },
    nationality: { type: 'string' },
    department: { type: 'string' },
    preferredLanguage: { type: 'string' },
    preferredCurrency: { type: 'string' },
    address: { type: 'string' },
    lineManager: { type: 'string' },
    phoneNumber: { type: 'string' },
    maritalStatus: { type: 'string' },
    isComplete: { type: 'boolean' },
  },
};

export default profileSchema;
