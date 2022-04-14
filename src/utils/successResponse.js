export default (res, status, message, body) => {
  res.status(status).json({ success: true, message, body });
};
