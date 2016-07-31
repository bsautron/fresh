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
	const user = new User(body);

	return user.save()
		.catch((err) => {
			logger.info(err.toJSON());

			return err;
		});
}
