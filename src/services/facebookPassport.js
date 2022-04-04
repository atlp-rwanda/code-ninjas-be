import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

const host = process.env.HOST || 'http://localhost:3000';

passport.serializeUser(function ser(user, done) {
  done(null, user);
});

passport.deserializeUser(function deser(user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRETE,
      callbackURL: `${host}/api/auth/auth/facebook/barefoot`,
      profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl'],
    },
    function strat(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
