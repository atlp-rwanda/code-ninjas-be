import passport from 'passport';
import models from '../database/models';
import generateToken from '../services/TokenService';
import '../services/googlePassport';

const { User } = models;
passport.use(passport.initialize());
passport.use(passport.session());

class facebookController {
  static onSuccessfb = async (req, res) => {
    try {
      const { name, id, email, displayName } = req.user;
      const [newUser] = await User.findOrCreate({
        where: { facebookId: req.user.id },
        defaults: {
          firstName: name.familyName,
          lastName: name.givenName,
          userName: displayName,
          facebookId: id,
        },
      });
      const secret = process.env.TOKEN_SECRET;

      const duration = {
        expiresIn: process.env.TOKEN_EXPIRE,
      };
      const params = {
        user: { id: newUser.dataValues.id },
      };
      const token = generateToken(params, secret, duration);

      res
        .header('Authorization', token)
        .status(200)
        .json({ message: 'logged in successfully', token });
    } catch {
      res.status(500).send({ error: 'Oooops something went worng' });
    }
  };
}
export default facebookController;
