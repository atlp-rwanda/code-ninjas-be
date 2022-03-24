export default (res, status, error) => {
  res.status(status).json({ message: error });
};
