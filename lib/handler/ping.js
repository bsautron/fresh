import response from './response';

export default {
  get: (req, res) => res.json(response.success({message: 'pong'}))
};
