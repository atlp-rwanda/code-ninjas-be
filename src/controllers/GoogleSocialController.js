import models from '../database/models';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../services/googlePassport';
const User = models.User;
passport.use(passport.initialize());
passport.use(passport.session());

class googleController {
    static loginWithGoogle = async(req, res) => {
        res.render('login');
    };
    static onSuccess = async(req, res) => {
        try {
            const [newUser, created] = await User.findOrCreate({
                where: { googleId: req.user.id },
                defaults: {
                    firstName: req.user.name.familyName,
                    lastName: req.user.name.givenName,
                    userName: req.user.displayName,
                    googleId: req.user.id,
                    email: req.user.email,
                },
            });
            const token = jwt.sign({
                    user: {
                        id: newUser.dataValues.id,
                    },
                },
                process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE }
            );

            res.header('auth-token', token).send(`TOKEN: ${token}`);
        } catch {
            res.status(500).send({ error: 'Oooops something went worng' });
        }
    };
}
export default googleController;