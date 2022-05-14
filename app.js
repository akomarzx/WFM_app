const { log } = require("console");
const express = require("express");
const session = require('express-session');
const app = express();
const path = require("path");
const { sequelize } = require("./models/index");
const dbstore = require('./models/index');
const flash = require('connect-flash');

//Session set-up using sequelize store
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({
  db: dbstore.sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000
});
app.set('trust proxy', 1);
app.use(session({
  secret: 'this is not a secure secret',
  resave: false,
  saveUninitialized: true,
  //Cookie will not save if not https
  cookie: { secure: false },
  store: store
}))
store.sync();
app.use(flash());

// Set Up View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Morgan Logging
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}

//flash middleware
app.use((req , res , next) =>{
  res.locals.messages = req.flash('success');
  next();
})

app.get("/", (req, res) => {
  req.flash('success' , 'Successful trial for flash' );
  res.redirect('/trial');
});

app.get('/trial' , (req , res) =>{
  res.render('trial');
})

app.use((err, req, res, next) => {
  console.log(err?.message);
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Currently in ${process.env.NODE_ENV} mode`);
  console.log(`Server Active at port ${process.env.PORT}`);
});
