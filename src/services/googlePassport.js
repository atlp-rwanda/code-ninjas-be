import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';

const host = process.env.HOST || 'http://localhost:3000';

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SEC,
            callbackURL: `${host}/api/auth/google/callback`,
            passReqToCallback: true,
        },
        function(request, accessToken, refreshToken, profile, done) {
            console.log(profile);
            return done(null, profile);
        }
    )
);