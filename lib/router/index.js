import bodyParser from 'body-parser';
import express from 'express';

import config from '../config';
import main from './main';
import user from './user';
import signup from './signup';

let Router = express.Router();

/* use Routes */
Router.use('/', main);
Router.use('/user', user);

export { signup };
export default Router;
