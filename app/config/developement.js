export default {
	'protocol': 'http',
	'hostname': 'localhost',
	'port': process.env.PORT || 3000,
	'db': 'mongodb://localhost:27017/localdata',
	'email': false,
	'log': true,
	'modules': [
		'users/users',
		'fridges/fridges'
	]
};
