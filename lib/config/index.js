import packagejson from '../../package.json';

export default {
  'name': 'Fresh',
  'version': packagejson.version,
  'port': process.env.PORT || 3000,
  'debug-morgan': (process.env.DEBUG && process.env.DEBUG.indexOf('morgan') > -1),
  'secret': 'thisissosecret',
  'database': 'mongodb://localhost:27017/localdata'
};
