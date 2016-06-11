import passport from 'passport';
import passportHttp from 'passport-http';
import passportHttpBearer from 'passport-http-bearer'
import models from '../models';

let BasicStrategy = passportHttp.BasicStrategy;
let BearerStrategy = passportHttpBearer.Strategy;

passport.use('basic', new BasicStrategy((username, password, callback) => {
  models.UserSchema.findOne({username: username}, (err, user) => {
    if (err) return callback(err);
    if (!user) return callback(null, false);

    user.comparePassword(password)
      .then(() => callback(null, user))
      .catch((err) => callback(null, false));
  });
}));

passport.use('client-basic', new BasicStrategy((username, password, callback) => {
  console.log('print username and password');
  models.ClientSchema.findOne({key: username}, (err, client) => {
    if (err) return callback(err);
    if (!client || client.secret != password) return callback(null, false);
    callback(null, client);
  });
}));

passport.use('bearer', new BearerStrategy((accessToken, callback) => {
  models.TokenSchema.findOne({value: accessToken}, (err, token) => {
    if (err) return callback(err);
    if (!token) return callback(null, false);

    models.UserSchema.findOne({_id: token.user_id}, (err, user) => {
      if (err) return callback(err);
      if (!user) return callback(null, false);
      callback(null, user, { scope: '*' });
    });
  });
}));

export let isAuthenticated = passport.authenticate(['basic', 'bearer'], {session: false});
export let isClientAuthenticated = passport.authenticate('client-basic', {session: false});
