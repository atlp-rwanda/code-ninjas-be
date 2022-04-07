import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import redis from '../database/redis';

config();

export const generateToken = (data, secret, expiresIn) => {
  return jwt.sign(data, secret, { expiresIn });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret, (error, result) => {
    if (error) {
      error.status = 401;
      throw error;
    }
    return result;
  });
};

export const getToken = (user, duration, tokenId = Date.now()) => {
  const secret = process.env.TOKEN_SECRET;

  const payload = { user, tokenId };

  const token = generateToken(payload, secret, duration);
  return { token, tokenId };
};

export const cacheToken = async (userCode, tokenObject) => {
  const { user, code } = userCode;
  const { token, tokenId, duration } = tokenObject;
  return redis.set(
    `${process.env.NODE_ENV}:user-${user.id}-${code}-${tokenId}`,
    token,
    'EX',
    duration,
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );
};
