/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse';
import {
  isAdmin,
  isSuperAdmin as superUser,
  isManager,
} from '../services/rolesServices';
import { Users } from '../database/models';

dotenv.config();
const jwtToken = process.env.TOKEN_SECRET;
const isSuperAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      ErrorResponse.forbiddenError('Unauthenticated', res);
    }
    jwt.verify(token, jwtToken, (err, decoded) => {
      if (err) {
        ErrorResponse.forbiddenError('Unauthenticated', res);
      } else {
        const { email } = decoded;
        const { id } = decoded;
        if (email != null && id != null) {
          const valid = { email, id };
          req.valid = valid;
          next();
        } else {
          ErrorResponse.notFoundError('Wrong authentication token', res);
        }
      }
    });
  } else {
    ErrorResponse.forbiddenError('Unauthenticated', res);
  }
};

const adminUser = async (req, res, next) => {
  const check = await isAdmin(req.user.email, req.user.id);
  if (check) {
    next();
  } else {
    ErrorResponse.forbiddenError(
      'Access denied, Not a Travel Administrator',
      res
    );
  }
};
const superAdmin = async (req, res, next) => {
  const check = await superUser(req.valid.email, req.valid.id);
  if (check) {
    next();
  } else {
    ErrorResponse.forbiddenError('Access denied', res);
  }
};
const isRequester = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { id: req.user.id } });
    if (user.roleId !== 4) {
      return ErrorResponse.unauthenticatedError('You are not a requester', res);
    }
    next();
  } catch (error) {
    return ErrorResponse.internalServerError('Error occured', res);
  }
};

const isManagerUser = async (req, res, next) => {
  const check = await isManager(req.user.email, req.user.id);
  if (check) {
    next();
  } else {
    ErrorResponse.forbiddenError('Access Denied, Not a Manager', res);
  }
};

const authorizeTripSearch = async (req, res, next) => {
  const check = req.roleId === 4;
  if (!check) {
    next();
  } else {
    ErrorResponse.forbiddenError('Access denied', res);
  }
};
export {
  isSuperAdmin,
  adminUser,
  superAdmin,
  isRequester,
  isManagerUser,
  authorizeTripSearch,
};
