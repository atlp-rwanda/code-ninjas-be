/* eslint-disable require-jsdoc */
import models from '../database/models';

const { User } = models;

class UserController {
  static getAllUsers = async (_req, res) => {
    User.findAll().then((data) => {
      res.status(200).send({ Response: data });
    });
  };
}
export default UserController;
