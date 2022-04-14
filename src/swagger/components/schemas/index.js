import userProfileSchema from './profile';
import userSchema from './user';
import loginSchema from './login';
import newPasswordSchema from './newPassword';

const schemas = {
  schemas: {
    ...userProfileSchema,
    ...userSchema,
    ...loginSchema,
    ...newPasswordSchema,
  },
};

export default schemas;
