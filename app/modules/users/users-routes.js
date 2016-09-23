import UsersHandler from './users-handler';

export default [
	{
		method: 'POST', path: '/users/authentificate', handler: UsersHandler.authentificate,
		allow: {
			'guest':	{perms: ['*']}
		}
	},
	{
		method: 'GET', path: '/users', handler: UsersHandler.getUsers,
		allow: {
			'member':	{perms: ['*']},
			'admin':	{perms: ['*']}
		}
	},
	{
		method: 'GET', path: '/users/:userId', handler: UsersHandler.getUser,
		allow: {
			'member':	{perms: ['*']},
			'admin':	{perms: ['*']}
		}
	},
	{
		method: 'POST', path: '/users', handler: UsersHandler.postUser,
		allow: {
			'guest':	{perms: ['*']},
			'member':	{perms: ['*']},
			'admin':	{perms: ['*']}
		}
	},
	{
		method: 'PUT', path: '/users/:userId', handler: UsersHandler.putUser,
		allow: {
			'member':	{perms: ['own']},
			'admin':	{perms: ['own', 'member']}
		}
	},
	{
		method: 'DELETE', path: '/users/:userId', handler: UsersHandler.deleteUser,
		allow: {
			'member':	{perms: ['own']},
			'admin':	{perms: ['own', 'member']}
		}
	}
];
