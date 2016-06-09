import bodyParser from 'body-parser';
import express from 'express';
import { isAuthenticated, isClientAuthenticated } from '../middleware/auth';

import config from '../config';
import handler from '../handler';

let RouterMain = express.Router();
let RouterApi = express.Router();
let RouterOauth2 = express.Router();
let Router = express.Router();

RouterMain
  .route('/')
  .get(handler.MainHandler.get)
  .post(handler.MainHandler.post);
RouterMain
  .route('/signup')
  .post(handler.UserHandler.post);

RouterApi
  .use(isAuthenticated);
RouterApi
  .route('/me')
  .get(handler.UserHandler.get);
RouterApi
  .route('/user')
  .get(handler.UserHandler.get)
  .post(handler.UserHandler.post);
RouterApi
  .route('/user/:id')
  .get(handler.UserIdHandler.get)
  .put(handler.UserIdHandler.put)
  .delete(handler.UserIdHandler.delete);

RouterOauth2
  .route('/authorize')
  .get(isAuthenticated, handler.Oauth2Handler.authorization)
  .post(isAuthenticated, handler.Oauth2Handler.decision);
RouterOauth2
  .route('/token')
  .post(isClientAuthenticated, handler.Oauth2Handler.token);

export default Router
  .use('/', RouterMain)
  .use(config['api-path'], RouterApi)
  .use(config['oauth2-path'], RouterOauth2);
