// TODO: Image upload system
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const {sequelize} = require('./src/models/index');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const methodOverride = require('method-override');
// Morgan and live Reloading
// Disable http caching to live reload css and js
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
  const livereload = require('livereload');
  const connectLiveReload = require('connect-livereload');
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 50);
  });
  app.use(connectLiveReload());
}
// Method override
app.use(methodOverride('_method'));

// Session set-up using sequelize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});
app.set('trust proxy', 1);
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false},
      store: store,
    }),
);
store.sync();
app.use(flash());

// passport related things
const initializePassport = require('./config/passport/passport');
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set Up View Engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// locals variable
app.use((req, res, next) => {
  res.locals.employee = req.user;
  res.locals.cssUrls = [];
  next();
});

app.use('/', require('./src/routes/indexRoutes'));
app.use('/auth', require('./src/routes/authRoutes')(passport));
app.use('/employees', require('./src/routes/employeeRoutes'));
app.use('/dashboard', require('./src/routes/dashboardRoutes'));
app.use('/roles', require('./src/routes/roleRoutes'));
app.use('/permissions', require('./src/routes/permissionRoutes'));
app.use('/role-permissions', require('./src/routes/rolePermissionRoutes'));
app.use('/departments', require('./src/routes/departmentRoutes'));

// TODO: Example for a Accept header.
// Will response with json if accept header is
// set to application/json
app.get('/test', (req, res, next) => {
  res.format({
    'text/html': function() {
      res.send('<h1>Hello world</h1>');
    },
    'application/json': function() {
      res.json({message: 'Hello Wrold'});
    },
  });
});

// Centralized Error Handling
// All errors from all layers will bubble up
// to this error handler
// TODO: improve the centralized error handler
app.use((err, req, res, next) => {
  if (req.flash) {
    req.flash('error', err.message);
  }
  console.log(err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.stack);
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
