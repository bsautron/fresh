import express from 'express';
import handler from '../handler';
import user_id from './user_id';
import user_id_fridge from './user_id_fridge';

let UserRouter = express();

UserRouter.use(user_id)
UserRouter.use(user_id_fridge)
UserRouter.route('/')
  .get(handler.UserHandler.get)

export default UserRouter;
