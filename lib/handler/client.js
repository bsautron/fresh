import response from './response';
import models from '../models';
import config from '../config';

export default {
  get: (req, res) => {
    models.ClientSchema.find((err, clients) => {
      if (err) return res.json(response.fail(0))

      let rr = {};
      for (let c of clients) if (c && c.name) rr[c.name] = models.ClientSchema.getInfos(c);
      res.json(response.success(rr));
    });
  },
  post: (req, res) => {
    let client = new models.ClientSchema({
      name: req.body.name,
      key: req.body.key, // generateUid(10)
      secret: req.body.secret, // generateUid(10)
      user_id: req.user._id
    });
    client.save()
    .then((results) => res.json(response.success(results)))
    .catch((err) => {
      res.json(response.fail(0));
      // const key_find = ' index: ';
      // let code = 0;
      // let field = '';
      //
      // if (err.code == 11000) {
      //   field = err.message.substr(err.message.indexOf(key_find) + key_find.length).split(' ')[0].slice(0, -2);
      //   code = (field == 'username') ? 1000 : 1001;
      //   res.json(response.fail(code));
      // } else if (err.name == 'ValidationError') {
      //   field = Object.keys(err.errors)[0];
      //   if (field == 'username') code = 1002;
      //   else if (field == 'password') code = 1003;
      //   else if (field == 'email') code = 1004;
      //   res.json(response.fail(code));
      // } else {
      //   res.json(response.fail(0));
      // }
    });
  }
}
