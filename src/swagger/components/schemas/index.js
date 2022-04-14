import userSchema from './user';
import loginSchema from './login';
import newPasswordSchema from './newPassword';

const schemas = {
  schemas: {
    ...userSchema,
    ...loginSchema,
    ...newPasswordSchema,
  },
};

export default schemas;
