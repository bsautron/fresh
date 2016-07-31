import UsersHandler from './users-handler';

export default [
	{
		method: 'GET',
		path: '/users',
		handler: UsersHandler.getUsers,
		allow: {
			'member': {},
			'admin': {}
		}
	},
	{
		method: 'GET',
		path: '/users/:userId',
		handler: UsersHandler.getUser,
		allow: {
			'member': {},
			'admin': {}
		}
	},
	{
		method: 'POST',
		path: '/users',
		handler: UsersHandler.postUser,
		allow: {
			'guest': {},
			'member': {},
			'admin': {}
		}
	},
	{
		method: 'PUT',
		path: '/users/:userId',
		handler: UsersHandler.putUser,
		allow: {
			'member': {perm: ['own']},
			'admin': {perm: ['onw', 'member']}
		}
	},
	{
		method: 'DELETE',
		path: '/users',
		handler: UsersHandler.deleteUser,
		allow: {
			'member': {perm: ['own']},
			'admin': {perm: ['onw', 'member']}
		}
	}
];
