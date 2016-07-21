import response from './response';
import models from '../models';
import config from '../config';

export default {
  get: (req, res) => {
    models.FridgeSchema.find({user_id: req.user._id}, (err, fridges) => {
      if (err) res.json(response.fail(0));
      else if (!fridges) res.json(response.fail(0));
      else {
        let ret = [];
        for (let fridge of fridges) ret.push(models.FridgeSchema.getInfos(fridge));
        res.json(response.success(ret));
      }
    });
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
