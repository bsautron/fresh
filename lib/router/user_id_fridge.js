import express from 'express';
import handler from '../handler';

let UserIdFridge = express();

UserIdFridge.route('/:id/fridge')
  .get(handler.UserIdFridgeHandler.get)

export default UserIdFridge;
