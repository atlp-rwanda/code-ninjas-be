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
            function(accessToken, refreshToken, profile, cb) {
                const { user, created } = User.findOrCreate({
                    where: { facebookId: profile.id },
                    defaults: {
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName,
                        userName: profile.displayName,
                        facebookId: profile.id,
                    },
                })

                console.log(profile)
                return cb(null, profile)
            }
        )
    )
}

export default facebookOauth