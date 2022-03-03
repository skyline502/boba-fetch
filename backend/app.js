const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

//environment
const { environment } = require('./config');
const isProduction = environment === 'production';

//routes
const routes = require('./routes');

//app
const app = express();

//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());//parsing json requests


//Security Middleware
if (!isProduction) {
  //enable cors only in development
  app.use(cors());
}

//helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
);

//Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

//routes
app.use(routes); //has to be after all the middlewares

//error-handlers
app.use((req, res, next) => {
  const err = new Error('The requested resource couldn\'t be found.');
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn\'t be found."];
  err.status = 404;
  next(err);
});

const { ValidationError } = require('sequelize');

//Process sequelize errors
app.use((err, req, res, next) => {
  //check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message);
    err.title = "Validation error";
  }
  next(err);
});

//Error formatter
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null: err.stack
  });
});



//====================
module.exports = app;
