class ErrorResponse {
  static notFoundError = (res, error = 'Not Found') => {
    res.status(404).json({ error });
  };

  static badRequestError = (res, error = 'Bad Request') => {
    res.status(400).json({ error });
  };

  static unauthenticatedError = (res, error = 'Unauthenticated') => {
    res.status(401).json({ error });
  };

  static forbiddenError = (res, error = 'Forbidden') => {
    res.status(403).json({ error });
  };

  static semanticError = (res, error = 'Unprocessable entity') => {
    res.status(422).json({ error });
  };

  static internalServerError = (res, error = 'Internal sever error') => {
    res.status(500).json({ error });
  };

  static badGatewayError = (res, error = 'Gateway error') => {
    res.status(502).json({ error });
  };
}

export default ErrorResponse;
