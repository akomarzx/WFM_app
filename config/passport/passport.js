const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {User, Employee, Role} = require('../../src/models');

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
    done(null, user.empId);
  });
  // eslint-disable-next-line camelcase
  passport.deserializeUser(async (empId, done) => {
    try {
      const employee = await Employee.findByPk(empId, {
        include: Role,
      });
      done(null, employee);
    } catch (error) {
      done(error);
    }
  });
};


