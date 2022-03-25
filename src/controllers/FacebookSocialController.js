import models from '../database/models';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../services/facebookPassport';
const User = models.User;
passport.use(passport.initialize());
passport.use(passport.session());

class facebookController {
    static onSuccess = async(req, res) => {
        try {
            const { name, id, email, displayName } = req.user;
            const [newUser, created] = await User.findOrCreate({
                where: { googleId: req.user.id },
                defaults: {
                    firstName: name.familyName,
                    lastName: name.givenName,
                    userName: displayName,
                    googleId: id,
                    email: email,
                },
            });
            const token = jwt.sign({
                    user: {
                        id: newUser.dataValues.id,
                    },
                },
                process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE }
            );

            res.header('auth-token', token).status(200).send(`TOKEN: ${token}`);
        } catch {
            res.status(500).send({ error: 'Oooops something went worng' });
        }
    };
}
export default facebookController;