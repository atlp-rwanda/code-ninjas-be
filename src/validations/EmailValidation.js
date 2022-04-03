import Joi from 'joi';
import validate from 'deep-email-validator';

const emailSchema = Joi.string().required().email();

class EmailValidation {
  static validateEmail = async (req, res, next) => {
    const { error } = emailSchema.validate(req.params.email);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/["'`]+/g, ''),
      });
    }
    next();
  };

  static checkEmail = async (req, res, next) => {
    const { email } = req.body;
    const { valid } = await validate(email);

    if (!valid) {
      return res.status(400).json({ error: `${email} is not a valid Email` });
    }
    next();
  };
}

export default EmailValidation;
