import models from '../database/models';
import createUserService from '../services/UserServices';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import { generateToken } from '../services/TokenService';
import { checkUser } from '../helpers/CheckUser';
=======
>>>>>>> a10e5b2 (Rebase from Develop)
const { v4: uuidv4 } = require('uuid');
const User = models.User;

class UserController {
  static createUser = async (req, res) => {
    //check if a user is in the database
<<<<<<< HEAD
    const check = {
      email: req.body.Email,
    };
    // const emailExists = await User.findOne({
    //   where: { email: req.body.Email },
    // });

    const emailExists = await checkUser(check);

=======
    const emailExists = await User.findOne({
      where: { email: req.body.Email },
    });
>>>>>>> a10e5b2 (Rebase from Develop)
    if (emailExists)
      return res.status(400).json({ message: 'Email already Exists' });

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    try {
      const user = await createUserService({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email,
        userName: req.body.UserName,
        password: hashedPassword,
<<<<<<< HEAD
      });

      //create and Assign a token
      const params = {
        user: { id: user.userId, username: user.userName, email: user.email },
      };

      const secret = process.env.TOKEN_SECRET;

      const duration = {
        expiresIn: process.env.TOKEN_EXPIRE,
      };

      const token = generateToken(params, secret, duration);

      res.header('Authorization', token);
      res.status(200).json({
        message: 'User created successfully',
        token: token,
=======
        userId: uuidv4(),
      });

      //create and Assign a token
      const token = jwt.sign(
        {
          user: { id: user.userId, username: user.userName, email: user.email },
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRE }
      );
      res.header('Authorization', token);
      res.status(200).json({
        message: 'User created successfully',
>>>>>>> a10e5b2 (Rebase from Develop)
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
export default UserController;
