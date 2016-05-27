import express from 'express';
import models from '../models';
import handler from '../handler';

const MainRouter = express();

MainRouter.route('/')
  .get(handler.MainHandler.get)
  .post(handler.MainHandler.post);

export default MainRouter;
