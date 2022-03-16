import models from '../database/models'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'
const User = models.User

const googleOauth = async(req, res) => {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SEC,
                callbackURL: 'http://localhost:3000/api/auth/google/callback',
                passReqToCallback: true,
            },
            async(request, accessToken, refreshToken, profile, done) => {
                const [newUser, created] = await User.findOrCreate({
                    where: { googleId: profile.id },
                    defaults: {
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName,
                        userName: profile.displayName,
                        googleId: profile.id,
                        email: profile.email,
                    },
                })
                const token = jwt.sign({
                        user: {
                            id: newUser.dataValues.id,
                        },
                    },
                    process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE }
                )
                if (created) return res.header('auth-token', token).send(token)

                console.log(token)
                return done(null, profile, token, newUser)
            }
        )
    )
}

export default googleOauth