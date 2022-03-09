import models from '../database/models'
import createUserService from '../services/UserServices'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const User = models.User

class UserController {
  static createUser = async (req, res) => {
    //check if a user is in the database
    const emailExists = await User.findOne({ where: { email: req.body.Email } })
    if (emailExists)
      return res.status(400).json({ message: 'Email already Exists' })

    //Hash the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.Password, salt)

    try {
      const user = await createUserService({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email,
        userName: req.body.UserName,
        password: hashedPassword,
      })

      //create and Assign a token
      const token = jwt.sign(
        {
          user: { id: user.id, username: user.userName, email: user.email },
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRE }
      )
      res.header('auth-token', token)
      res.status(200).json({
        message: 'User created successfully',
      })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
export default UserController
