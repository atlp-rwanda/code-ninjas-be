import userSchema from './user';
import loginSchema from './login';
import newPasswordSchema from './newPassword';
import accommodationSchema from './accommodation';
import securitySchema from './security';
import TripRequestSchema from './TripRequest';

const schemas = {
  schemas: {
    ...userSchema,
    ...loginSchema,
    ...newPasswordSchema,
    ...accommodationSchema,
    ...securitySchema,
    ...TripRequestSchema,
  },
};

export default schemas;
