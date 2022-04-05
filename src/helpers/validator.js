import Joi from 'joi';

const Schema = {
  login: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(new Error('Please fill all fields')),
    password: Joi.string()
      .required()
      .trim()
      .error(new Error('Please fill all fields')),
  }),
};

export default Schema;
