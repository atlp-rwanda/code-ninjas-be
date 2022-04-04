import jwt, { verify } from 'jsonwebtoken';

const verifyMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(401)
      .send({ Message: 'You are not allowed to access this page' });
  }
  try {
    const authorized = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = authorized;
    next();
  } catch (error) {
    res.status(400).send({ Message: 'invalide token' });
  }
};
export default verifyMiddleware;
