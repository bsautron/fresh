import express from 'express';
import config from '../config';
import router from '../router';
import mongoose from 'mongoose';

let app = express()
  .use('/api', router)
  .listen(config.port);

mongoose.connect(config.database);
