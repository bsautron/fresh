import UserHandler from './users-handler';

export default [
	{method: 'GET', path: '/users', handler: UserHandler.getUsers},
	{method: 'GET', path: '/users/:userId', handler: UserHandler.getUser},
	{method: 'POST', path: '/users', handler: UserHandler.postUser},
];
