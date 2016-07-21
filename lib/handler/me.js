import config from '../config';
import models from '../models';
import response from './response';

export default {
  get: (req, res) => {
    models.UserSchema.find({_id: req.user._id}, (err, users) => {
      if (err) res.json(response.fail(1100));
      else res.json(response.success(models.UserSchema.getInfos(users[0])));
    });
  }
}
