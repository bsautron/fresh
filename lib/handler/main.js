import response from './response';

export default {
  get: (req, res) => {
    let data = {message: 'Hello everyone'};
    res.json(response(null, data));
  },
  post: (req, res) => {
    let data = {message: 'Everyone can post thanks to this route'};
    res.json(response(null, data));
  }
}
