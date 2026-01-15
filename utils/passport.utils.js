const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { findOneUser, findUserById } = require('../services/user.service');

const initPassport = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await findOneUser({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { User, Role } = require('../models');
      const user = await User.findByPk(id, { include: Role });
      if (!user) {
        return done(new Error('User not found'));
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = { initPassport };