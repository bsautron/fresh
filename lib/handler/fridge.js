import response from './response';
import models from '../models';
import config from '../config';

export default {
  get: (req, res) => {
    res.redirect(`${config['api-path']}/user/${req.user._id}/fridge`)
  },
  post: (req, res) => {
    let fridge = new models.FridgeSchema({
      name: req.body.name,
      user_id: req.user._id,
      capacity: req.body.capacity | 100
    });

    fridge.save()
      .then((results) => res.json(response.success(results)))
      .catch((err) => {
        res.json(response.fail(0));
      });
  }
}
