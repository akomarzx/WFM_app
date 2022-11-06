// TODO: Unified Data access layer.
// Only pass the object option
const express = require('express');
const app = express();
const {sequelize} = require('./src/models/index');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());

// passport related things
const initializePassport = require('./config/passport/passport');
initializePassport(passport);
app.use(passport.initialize());

// body parsers
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));

app.use(morgan('dev'));

app.use('/auth', require('./src/routes/authRoutes')(passport));
app.use('/employees', require('./src/routes/employeeRoutes'));
app.use('/roles', require('./src/routes/roleRoutes'));
app.use('/permissions', require('./src/routes/permissionRoutes'));
app.use('/role-permissions', require('./src/routes/rolePermissionRoutes'));
app.use('/departments', require('./src/routes/departmentRoutes'));
app.use('/positions', require('./src/routes/positionRoutes'));

// Centralized Error Handling
// All errors from all layers will bubble up
// to this error handler
// TODO: improve the centralized error handler

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.statusCode).json({error: err.message});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Currently in ${process.env.NODE_ENV} mode`);
  console.log(`Server Active at port ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database is Connected');
  } catch (e) {
    process.exit(1);
  }
});
