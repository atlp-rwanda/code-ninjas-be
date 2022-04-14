import bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

const { TOKEN_SECRET, REFRESH_SECRET } = process.env;

class Protection {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static checkPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}

export default Protection;
