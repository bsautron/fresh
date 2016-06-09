import bodyParser from 'body-parser';
import ejs from 'ejs';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import session from 'express-session';

import config from '../config';
import router from '../router';

let app = express()
  .set('view engine', 'ejs')
  .use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use((config['debug-morgan']) ? morgan('dev') : null)
  .use(router)
  .listen(config.port);

mongoose.connect(config.database);
