import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRE } = process.env;

class Protection {
  static async signToken(data) {
    const token = sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    return token;
  }

  static async verifyToken(token) {
    const data = verify(token, JWT_SECRET);
    return data;
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static checkPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}

export default Protection;
