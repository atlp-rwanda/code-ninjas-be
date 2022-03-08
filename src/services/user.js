/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import { config } from 'dotenv';
import Models from '../database/models/index';
import Protection from '../helpers/encryption';

config();

const { User } = Models;
const { verifyToken } = Protection;

class userServices {
  async userLogout(accessToken) {
    const token = await verifyToken(accessToken);
    const { email } = token;
    const user = await User.findOne({ where: email });

    client.setEx(`${accessToken}`, 3600, JSON.stringify(user.email));

    return user;
  }
}

export default userServices;
