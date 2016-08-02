import FridgeHandler from './fridges-handler';

export default [
	{
		method: 'GET', path: '/fridges', handler: FridgeHandler.getFridges,
		allow: {
			'admin':	{perms: ['*']}
		}
	},
	{
		method: 'GET', path: '/users/:userId/fridges', handler: FridgeHandler.getUserFridges,
		allow: {
			'member':	{perms: ['own']},
			'admin':	{perms: ['own', 'member']}
		}
	},
	{
		method: 'GET', path: '/users/:userId/fridges/:fridgeId', handler: FridgeHandler.getUserFridge,
		allow: {
			'member':	{perms: ['own']},
			'admin':	{perms: ['own', 'member']}
		}
	},
	{
		method: 'POST', path: '/users/:userId/fridges', handler: FridgeHandler.postUserFridge,
		allow: {
			'member':	{perms: ['own']},
			'admin':	{perms: ['own', 'member']}
		}
	}
];
