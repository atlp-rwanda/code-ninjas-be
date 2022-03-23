import models from '../database/models'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import FacebookStrategy from 'passport-facebook'

const User = models.User
const facebookOauth = () => {
    passport.use(
        new FacebookStrategy({
                clientID: process.env.FB_CLIENT_ID,
                clientSecret: process.env.FB_CLIENT_SECRETE,
                callbackURL: 'http://localhost:3000/api/auth/facebook/barefoot',
                profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl'],
            },
            async(accessToken, refreshToken, profile, cb) => {
                const [user, created] = await User.findOrCreate({
                    where: { facebookId: profile.id },
                    defaults: {
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName,
                        userName: profile.displayName,
                        facebookId: profile.id,
                    },
                })
                const token = jwt.sign({
                        user: {
                            id: user.dataValues.id,
                        },
                    },
                    process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE }
                )
                if (created) return res.header('auth-token', token)

                console.log(token)
                return cb(null, profile)
            }
        )
    )
}

export default facebookOauth