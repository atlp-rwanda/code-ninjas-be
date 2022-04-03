import passport from 'passport';
import models from '../database/models';
import RefreshToken from '../services/token';
import { generateToken } from '../helpers/token';
import '../services/googlePassport';

const { User } = models;
passport.use(passport.initialize());
passport.use(passport.session());

class googleController {
  static loginWithGoogle = async (req, res) => {
    res.render('login');
  };

  static onSuccess = async (req, res) => {
    try {
      const { name, id, email, displayName } = req.user;
      const [newUser] = await User.findOrCreate({
        where: { googleId: req.user.id },
        defaults: {
          firstName: name.familyName,
          lastName: name.givenName,
          userName: displayName,
          googleId: id,
          email,
        },
      });
      const secret = process.env.TOKEN_SECRET;

      const duration = process.env.TOKEN_EXPIRE;
      const params = {
        user: { id: newUser.dataValues.id, email: newUser.dataValues.email },
      };
      const accessToken = generateToken(params, secret, duration);
      const refreshToken = await RefreshToken(params);

      res.header('Authorization', accessToken).status(200).json({
        message: 'logged in successfully',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
export default googleController;
