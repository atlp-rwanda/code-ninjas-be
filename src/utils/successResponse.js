export default (res, status, body) => {
  res.status(status).json(body);
};
