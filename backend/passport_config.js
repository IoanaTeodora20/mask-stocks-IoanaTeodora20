const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./DataSchema/userSchema");

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) throw err;
        if (!user)
          return done(null, false, {
            message: "No user found with this email!",
          });

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (!result)
            return done(null, false, { message: "Password Incorrect" });
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};
