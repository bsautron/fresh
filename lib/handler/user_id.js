import response from './response';
import models from '../models';

export default {
  get: (req, res) => {
    models.UserSchema.find({_id: req.params.id}, (err, users) => res.json(response(err, users)));
  },
  put: (req, res) => {
    res.json(response(null, {message: 'Update is comming'}));
  },
  delete: (req, res) => {
    models.UserSchema.remove({_id: req.params.id}, (err) => {
      res.json(response(err, null));
    })
  }
}
