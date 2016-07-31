import logger from '../../utils/logger';
import User from './users-schema';
import ApiError from '../../utils/errors/api-error';

export default {
	getUsers,
	getUser,
	createUser
};

function getUsers() {
	logger.debug('getUsers');
	return User.find({});
}

function getUser(id) {
	logger.debug('getUser', id);
	return new Promise((resolve, reject) => {
		User.findOne({_id: id})
			.then((user) => {
				if (!user) return reject(new ApiError('user-not-found'));
				resolve(user);
			});
	});
}

function createUser(body) {
	logger.debug('createUser', body);

	return new Promise((resolve, reject) => {
		const user = new User(body);

		return user.save()
			.catch((err) => {
				let apiError;

				if (err.name == 'ValidationError') {
					apiError = new ApiError('user-validation-failed');

					for (let filed in err.errors) {
						apiError.add(err.errors[filed]);
					}
				} else if (err.code == 11000) {
					apiError = new ApiError('user-already-exist');
					apiError.add(`${err.errmsg.match(/(\w+)_1/)[1]}-already-exist`);
				}
				reject(apiError || err);
			});
	});
}
