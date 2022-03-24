export default (res, status, message, datas) => {
  res.status(status).json({
    success: true,
    message,
    data: datas,
  });
};
