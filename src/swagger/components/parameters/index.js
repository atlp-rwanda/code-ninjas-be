import id from './id';
import email from './email';
import token from './token';

export default {
  parameters: {
    ...id,
    ...email,
    ...token,
  },
};
