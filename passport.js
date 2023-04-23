// passport.js

// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      const isPasswordValid = await user.verifyPassword(password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);


