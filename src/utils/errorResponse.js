export default (res, status, message) => {
  res.status(status).json({
    success: false,
    message,
  });
};
