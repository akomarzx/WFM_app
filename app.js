const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const { sequelize } = require('./models/index');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');

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
    //switch to env variable once deployed for production
    secret: 'this is not a secure secret',
    resave: false,
    saveUninitialized: true,
    //Cookie will not save if not https switch to true if deployed to production
    cookie: { secure: false },
    store: store,
  })
);
store.sync();
app.use(flash());

//Morgan Logging and live Reloading
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

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

app.get('/', (req, res) => {
  res.render('index');
});

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

app.use((err, req, res, next) => {
  req.flash('error', 'Invalid request');
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
