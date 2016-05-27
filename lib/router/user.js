import express from 'express';
import handler from '../handler';
import user_id from './user_id';

let UserRouter = express();

UserRouter.use(user_id)
UserRouter.route('/')
  .get(handler.UserHandler.get)

export default UserRouter;
