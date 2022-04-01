// @desc   middleware to log request to the console
function logger(req, res, next) {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
}

export default logger;
