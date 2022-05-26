export default function queryValidate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).send({
        status: 400,
        data: {
          message: error.details[0].message.replace(/[/"]+/g, ''),
          error,
        },
      });
    }
    next();
  };
}
