import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

const host = process.env.HOST || 'http://localhost:3000';

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(
    new FacebookStrategy({
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRETE,
            callbackURL: `${host}/api/auth/facebook/barefoot`,
            profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl'],
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            return done(null, profile);
        }
    )
);