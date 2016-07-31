import logger from '../../utils/logger';
import UserSchema from './users-schema';
import ApiError from '../../utils/errors/api-error';

export default {
	front,
	frontList,

	findUser,
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
};

function getUsers() {
	logger.debug('getUsers');
	return UserSchema.find({});
}

function getUser(id) {
	logger.debug('getUser', id);
	return new Promise((resolve, reject) => {
		UserSchema.findOne({_id: id})
			.then((user) => {
				if (!user) return reject(new ApiError('user-not-found'));
				resolve(user);
			})
			.catch((err) => reject(err));
	});
}

function findUser(username) {
	logger.debug('findUser', username);
	return new Promise((resolve, reject) => {
		UserSchema.findOne({username: username})
			.then((user) => {
				if (!user) return reject(new ApiError('user-not-found'));
				resolve(user);
			})
			.catch((err) => reject(err));
	});
}

function createUser(body) {
	logger.debug('createUser', body);

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

function deleteUser(id) {
	logger.debug('deleteUser', id);

	return UserSchema.remove({_id: id});
}

function updateUser(id, body) {
	logger.debug('updateUser', id);

	return UserSchema.update({_id: id}, body);
}

function front(user) {
	return UserSchema.front(user);
}

function frontList(users) {
	let front = [];

	for (let user of users) {
		front.push(UserSchema.front(user));
	}
	return front;
}
