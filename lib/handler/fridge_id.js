import models from '../models';
import response from './response';

export default {
  get: (req, res) => {
    models.FridgeSchema.findOne({_id: req.params.fridge_id}, (err, fridge) => {
      if (err) res.json(response.fail(0));
      else if (!fridge) res.json(response.fail(0));
      else res.json(response.success(models.FridgeSchema.getInfos(fridge)));
    });
  }
}
