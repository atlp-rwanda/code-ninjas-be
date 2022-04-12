import jwt, { verify } from 'jsonwebtoken';

const verifyAuth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(401)
      .send({ error: 'You are not allowed to access this page' });
  }
  try {
    const authorized = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = authorized;
    next();
  } catch (error) {
    res.status(400).send({ error: 'invalid token' });
  }
};
export default verifyAuth;
