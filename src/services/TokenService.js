import jwt from 'jsonwebtoken';

const generateToken = (params, secret, expire) => {
  return jwt.sign(params, secret, expire);
};

export default generateToken;
