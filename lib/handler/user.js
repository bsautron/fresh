import response from './response';
import models from '../models';

export default {
  get: (req, res) => {
    models.UserSchema.find((err, users) => {
      let rr = {};
      for (let u of users) if (u && u.username) rr[u.username] = `/user/${u._id}`;
      res.json(response(err, users));
    });
  },
  post: (req, res) => {
    let user = new models.UserSchema({
      username: req.body.username,
      password: req.body.password
    });
    user.validate((err) => {
      if (err) res.json(response(err));
      else {
        user.save();
        res.json(response(null, user));
      }
    });
  }
}
