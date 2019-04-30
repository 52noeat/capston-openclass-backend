const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');
const Class = require('../models/Class');


module.exports = ()=> {
  passport.use(
    new LocalStrategy({ usernameField: 'email',session: true }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log(user.email+'님이 로그인 하셨습니다.');

            return done(null, user);
          } else {
            console.log(user.email+'님이 비밀번호를 틀리셨습니다.');
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
