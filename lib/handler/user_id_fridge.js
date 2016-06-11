import response from './response';
import models from '../models';

export default {
  get: (req, res) => {
    models.FridgeSchema.find({user_id: req.params.user_id}, (err, fridges) => {
      if (err) res.json(response.fail(0));
      else {
        let fridgeResponse = [];
        for (let fridge of fridges) {
          fridgeResponse.push(models.FridgeSchema.getInfos(fridge));
        }
        res.json(response.success(fridgeResponse));
      }
    })
  }
}
