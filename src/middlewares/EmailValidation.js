import validate from 'deep-email-validator';

class EmailValidation {
  static checkEmail = async (req, res, next) => {
    const email = req.body.Email;
    const { valid } = await validate(email);

    if (!valid) {
      return res.status(400).json({ message: `${email} is not a valid Email` });
    }
    next();
  };
}

export default EmailValidation;
