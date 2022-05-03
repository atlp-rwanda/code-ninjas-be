import userSchema from './user';
import loginSchema from './login';
import newPasswordSchema from './newPassword';
import accommodationSchema from './accommodation';

const schemas = {
  schemas: {
    ...userSchema,
    ...loginSchema,
    ...newPasswordSchema,
    ...accommodationSchema,
  },
};

export default schemas;
