import packagejson from '../../package.json';

export default {
  'name': 'Frigde',
  'version': packagejson.version,
  'port': process.env.PORT || 3000,
  'debug-morgan': false,
  'secret': 'thisissosecret',
  'database': 'mongodb://localhost:27017/localdata'
};
