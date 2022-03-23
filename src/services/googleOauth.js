import models from '../database/models'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'
const User = models.User

const googleOauth = async() => {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SEC,
                callbackURL: 'http://localhost:3000/api/auth/google/callback',
                passReqToCallback: true,
            },
            function(request, accessToken, refreshToken, profile, done) {
                const { newUser } = User.findOrCreate({
                    where: { googleId: profile.id },
                    defaults: {
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName,
                        userName: profile.displayName,
                        googleId: profile.id,
                        email: profile.email,
                    },
                })

                //token

                // const token = jwt.sign({
                //         user: {
                //             id: newUser.id,
                //             username: newUser.userName,
                //             email: 'newUser.email',
                //         },
                //     },
                //     process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE }
                // )

                // res.header('auth-token', token)
                // res.status(200).json({
                //     message: 'User created successfully',
                // })
                console.log(token)

                console.log(profile)

                return done(null, profile)
            }
        )
    )
}

export default googleOauth