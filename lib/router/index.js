import bodyParser from 'body-parser';
import express from 'express';
import { isAuthenticated, isClientAuthenticated } from '../middleware/auth';

import config from '../config';
import handler from '../handler';

let RouterMain = express.Router();
let RouterApi = express.Router();
let Router = express.Router();

RouterMain
  .route('/')
  .get(handler.MainHandler.get)
  .post(handler.MainHandler.post);
RouterMain
  .route('/signup')
  .post(handler.UserHandler.post);

RouterApi
  .route('/me')
  .get(isAuthenticated, handler.MeHandler.get);
RouterApi
  .route('/user')
  .get(isAuthenticated, handler.UserHandler.get)
  .post(isAuthenticated, handler.UserHandler.post);
RouterApi
  .route('/user/:id')
  .get(isAuthenticated, handler.UserIdHandler.get)
  .put(isAuthenticated, handler.UserIdHandler.put)
  .delete(isAuthenticated, handler.UserIdHandler.delete);
RouterApi
  .route('/client')
  .get(isAuthenticated, handler.ClientHandler.get)
  .post(isAuthenticated, handler.ClientHandler.post);
RouterApi
  .route('/oauth2/authorize')
  .get(isAuthenticated, handler.Oauth2Handler.authorization)
  .post(isAuthenticated, handler.Oauth2Handler.decision)
RouterApi
  .route('/oauth2/token')
  .post(isClientAuthenticated, handler.Oauth2Handler.token);

export default Router
  .use('/', RouterMain)
  .use(config['api-path'], RouterApi)
