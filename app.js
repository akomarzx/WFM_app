 //TODO: All Controllers have to be refactored to make it thinner 
// Research how to implement a service layer.
//Controller - will handle the requests and will use services. It will also handle validation that will be pass onto the api
//Services = will contain all business logic
const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');
const path = require('path');
const app = express();
const { sequelize } = require('./models/index');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const passport = require('passport')

//Morgan and live Reloading
//Disable http caching to live reload css and js
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
  var livereload = require('livereload');
  var connectLiveReload = require('connect-livereload');
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 50);
  });
  app.use(connectLiveReload());
}
//Session set-up using sequelize store
var SequelizeStore = require('connect-session-sequelize')(session.Store);
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
    //Cookie will not save if not https switch to true if deployed to production
    cookie: { secure: false },
    store: store,
  })
);
store.sync();
app.use(flash());

//passport related things
let initializePassport = require('./config/passport/passport')
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set Up View Engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/indexRoute'));
app.use('/auth', require('./routes/authRoutes')(passport));
app.use('/employees', require('./routes/employeeRoutes'));
app.use('/attendance', require('./routes/attendanceRoutes'));
app.use('/dashboard' , require('./routes/dashboardRoute'));

app.use((err, req, res, next) => {
  req.flash('error', err.message);
  res.redirect('/');
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Currently in ${process.env.NODE_ENV} mode`);
  console.log(`Server Active at port ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database is Connected');
  } catch (e) {
    console.log(e.message);
  }
});
