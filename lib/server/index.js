import bodyParser from 'body-parser';
import ejs from 'ejs';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';

import config from '../config';
import router from '../router';

// SECURITY: hashing the client secret, authorization code, and access token.
let app = express()
  .set('view engine', 'ejs')
  // .use(session({
  //   secret: 'Super Secret Session Key',
  //   saveUninitialized: true,
  //   resave: true
  // }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .options('*', cors())
  .use(router)
  .listen(config.port);

mongoose.connect(config.database);
