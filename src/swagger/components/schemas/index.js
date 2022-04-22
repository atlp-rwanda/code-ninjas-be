import userSchema from './user';
import loginSchema from './login';
import newPasswordSchema from './newPassword';
import accommodationSchema from './accommodation';
import TripRequestSchema from './TripRequest';

const schemas = {
  schemas: {
    ...userSchema,
    ...loginSchema,
    ...newPasswordSchema,
    ...accommodationSchema,
    ...TripRequestSchema,
  },
};

export default schemas;
