import logger from '../../utils/logger';
import UserSchema from './users-schema';
import ApiError from '../../utils/errors/api-error';

const log = logger('users');

export default {
	findUser,
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
};

function getUsers() {
	log.debug('getUsers');
	return UserSchema.find({});
}

function getUser(userId) {
	log.debug('getUser', userId);
	return UserSchema.findOne({_id: userId});
}

function findUser(username) {
	log.debug('findUser', username);
	return UserSchema.findOne({username: username});
}

function createUser(body) {
	log.debug('createUser');

	return new Promise((resolve, reject) => {
		body.role = 'member';
		const user = new UserSchema(body);

		user.save()
			.then((user) => resolve(user))
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

function deleteUser(userId) {
	log.debug('deleteUser', userId);

	return UserSchema.remove({_id: userId});
}

function updateUser(userId, body) {
	log.debug('updateUser', id);

	return UserSchema.update({_id: userId}, {$set: body});
}
