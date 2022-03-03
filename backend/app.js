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



//====================
module.exports = app;
