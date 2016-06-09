import config from '../config';

export default {
  get: (req, res) => res.redirect(`${config['api-path']}/user/${req.user._id}`)
}
