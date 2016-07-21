import ClientHandler from './client';
import FridgeHandler from './fridge';
import FridgeIdHandler from './fridge_id';
import MainHandler from './main';
import MeHandler from './me';
import Oauth2Handler from './oauth2';
import UserHandler from './user';
import UserIdFridgeHandler from './user_id_fridge';
import UserIdHandler from './user_id';
import PingHandler from './ping';

const IsAuthenticated = {
  get: (req, res) => res.send(200),
};

export default {
  MainHandler,
  MeHandler,
  UserHandler,
  UserIdHandler,
  UserIdFridgeHandler,
  FridgeHandler,
  FridgeIdHandler,
  ClientHandler,
  Oauth2Handler,
  IsAuthenticated,
  PingHandler,
};
