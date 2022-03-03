const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csrf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config/index');
const isProduction = environment === 'production';

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
  csrf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);
