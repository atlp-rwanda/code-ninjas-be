import jwt from 'jsonwebtoken';

export const generateToken = (data, secret, expiresIn) => {
  return jwt.sign(data, secret, { expiresIn });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
