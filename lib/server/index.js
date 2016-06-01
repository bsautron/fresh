import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from '../config';
import router from '../router';
import { signup } from '../router';

let app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use((config['debug-morgan']) ? morgan('dev') : null)
  .use('/signup', signup)
  .use(config['api-path'], router)
  .listen(config.port);

mongoose.connect(config.database);
