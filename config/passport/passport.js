const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {User, Employee} = require('../../src/models');

const validatePassword = async (plainText, hashedPassword) => {
  try {
    return await bcrypt.compare(plainText, hashedPassword);
  } catch {
    return false;
  }
};
module.exports = async (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await User.findByPk(email);
      if (user == null) {
        return done(null, false, {message: 'Invalid Username or password'});
      }
      if (await validatePassword(password, user.hash)) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Username or password'});
      }
    } catch (err) {
      return done(err);
    }
  },
  ),
  );
  passport.serializeUser(function(user, done) {
    done(null, user.emp_id);
  });
  passport.deserializeUser(async (emp_id, done) => {
    try {
      const employee = await Employee.findByPk(emp_id);
      done(null, employee);
    } catch (error) {
      done(error);
    }
  });
};


