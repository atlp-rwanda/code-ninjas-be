import userSchema from './user';
import loginSchema from './login';
import securitySchema from './security';

const schemas = {
  schemas: {
    ...userSchema,
    ...loginSchema,
    ...securitySchema,
  },
};

export default schemas;
