export default (res, status, message, body) => {
  res.status(status).json({ message, body });
};
