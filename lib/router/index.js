import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

import main from './main';
import user from './user';
import signup from './signup';

let Router = express.Router();

/* use Middlewars */
Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());
Router.use(morgan('dev'));

/* use Routes */
Router.use('/', main);
Router.use('/user', user);
Router.use('/signup', signup);

export default Router;
