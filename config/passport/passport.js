// https://medium.com/@saranyamohandas2/passportjs-with-mysql-sequelize-and-expressjs-56fb903aaf8f follow through
let bcrypt = require('bcrypt');
let localStrategy = require('passport-local').Strategy;
let {User , PunchInfo} = require('../../models');






