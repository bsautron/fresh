import express from 'express';
import handler from '../handler';

let UserSignupRouter = express();

UserSignupRouter.route('/')
  // .get() for the render page, but no for the api
  .post(handler.UserHandler.post);

export default UserSignupRouter;
