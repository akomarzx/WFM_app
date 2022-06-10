let bcrypt = require('bcrypt');
let localStrategy = require('passport-local').Strategy;
let { User, PunchInfo, Employee } = require('../../src/models');

let validatePassword = async (plainText, hashedPassword) => {
    try {
        return await bcrypt.compare(plainText, hashedPassword);
    }
    catch {
        return false;
    }
}
module.exports = async (passport) => {
    passport.use(new localStrategy({
        usernameField: 'email'
    },
        async (email, password, done) => {
            try {
                let user = await User.findByPk(email);
                if (user == null) {
                   return done(null, false , {message : 'Invalid Username or password'});
                }
                if (await validatePassword(password , user.hash)) {
                    return done(null, user)
                }
                else {
                    return done(null, false, {message : 'Invalid Username or password'});
                }
            } catch (err) {
                return done(err);
            }
        }
    )
    )
    passport.serializeUser(function (user, done) {
        done(null, user.emp_id);
    })
    passport.deserializeUser(async (emp_id, done) => {
        try {
            let employee = await Employee.findByPk(emp_id)
            done(null, employee);
        } catch (error) {
            done(error)
        }
    })
};









