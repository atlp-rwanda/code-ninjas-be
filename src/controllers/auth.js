/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { config } from 'dotenv';
import userServices from '../services/user';
import successRes from '../utils/successResponse';
import ErrorRess from '../utils/errorResponse';

config();

const { userLogout } = userServices;

class Auth {
  async Logout(req, res) {
    try {
      const user = await userLogout(req.headers.authorization.split(' ')[1]);
      return successRes(res, 200, 'Log out successfully', user.email);
    } catch (err) {
      return ErrorRess(res, 500, `Error while logging out, ${err.message}`);
    }
  }
}

export default Auth;
