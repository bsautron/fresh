import express from 'express';
import handler from '../handler';

let UserIdRouter = express();

UserIdRouter.route('/:id')
  .get(handler.UserIdHandler.get)
  .put(handler.UserIdHandler.put)
  .delete(handler.UserIdHandler.delete)

export default UserIdRouter;
