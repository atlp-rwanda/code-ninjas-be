import bcrypt from 'bcrypt';
import models from '../database/models';
import createUserService from '../services/UserServices';
import generateToken from '../services/TokenService';
import checkUser from '../services/CheckUser';

const { User } = models;

class UserController {
  static createUser = async (req, res) => {
    // check if a user is in the database
    const check = {
      email: req.body.Email,
    };

    const emailExists = await checkUser(check);

    if (emailExists) {
      return res.status(400).json({ message: 'Email already Exists' });
    }

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    try {
      const user = await createUserService({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email,
        userName: req.body.UserName,
        password: hashedPassword,
      });

      // create and Assign a token
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
        token,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
export default UserController;
