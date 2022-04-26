/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import models from '../database/models';

const { User } = models;

export const roleEntryValidation = Joi.object({
  RoleId: Joi.string()
    .valid('1', '2', '3')
    .required()
    .pattern(/^[0-9]/)
    .messages({
      'string.pattern.base': '{{#label}} must contain a valid id',
      'string.valid.base':
        '{{#label}} must be written as 1, 2, 3 representing requester,manager, and admin respectively',
    }),
});
