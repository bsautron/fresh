import response from './response';
import models from '../models';

export default {
  get: (req, res) => {
    models.UserSchema.find({_id: req.params.id}, (err, users) => {
      if (err) res.json(response.fail(1100));
      else res.json(response.success(users[0]));
    });
  },
  put: (req, res) => {
    res.json(response.success({message: 'Update is comming'}));
  },
  delete: (req, res) => {
    models.UserSchema.remove({_id: req.params.id}, (err) => {
      if (err) res.json(response.fail(1100));
      else res.json(response.success({message: `User id: ${req.params.id} deleted`}));
    })
  }
}
