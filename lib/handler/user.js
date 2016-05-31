import response from './response';
import models from '../models';

export default {
  get: (req, res) => {
    models.UserSchema.find((err, users) => {
      if (err) return res.json(response.fail(0))

      let rr = {};
      for (let u of users) if (u && u.username) rr[u.username] = `/user/${u._id}`;
      res.json(response.success(rr));
    });
  },
  post: (req, res) => {
    let user = new models.UserSchema({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    user.save()
    .then((results) => res.json(response.success(results)))
    .catch((err) => {
      const key_find = ' index: ';
      let code = 0;
      let field = '';

      if (err.code == 11000) {
        field = err.message.substr(err.message.indexOf(key_find) + key_find.length).split(' ')[0].slice(0, -2);
        code = (field == 'username') ? 1000 : 1001;
        res.json(response.fail(code));
      } else if (err.name == 'ValidationError') {
        field = Object.keys(err.errors)[0];
        if (field == 'username') code = 1002;
        else if (field == 'password') code = 1003;
        else if (field == 'email') code = 1004;
        res.json(response.fail(code));
      } else {
        res.json(response.fail(0));
      }
    });
  }
}
