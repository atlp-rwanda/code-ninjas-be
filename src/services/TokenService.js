import jwt from 'jsonwebtoken';

export const generateToken = (params, secret, expire) => {
    return jwt.sign(params, secret, expire);
};

// const token = jwt.sign(
//     {
//       user: { id: user.userId, username: user.userName, email: user.email },
//     },
//     process.env.TOKEN_SECRET,
//     { expiresIn: process.env.TOKEN_EXPIRE }
//   );