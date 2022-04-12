import passport from 'passport';
import models from '../database/models';
import RefreshToken from '../services/token';
import { generateToken } from '../helpers/token';
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

      const duration = process.env.TOKEN_EXPIRE;
      const params = {
        user: { id: newUser.dataValues.id },
      };
      const accessToken = generateToken(params, secret, duration);
      const refreshToken = RefreshToken(params);

      res.header('Authorization', accessToken).status(200).json({
        message: 'logged in successfully',
        accessToken,
        refreshToken,
      });
    } catch {
      res.status(500).send({ error: 'Oooops something went worng' });
    }
  };
}
export default facebookController;
