import Users from '../users/users-service';
import ApiError from '../../utils/errors/api-error';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportHttp from 'passport-http';

const BasicStrategy = passportHttp.BasicStrategy;

export default {
	get,
	can
};

export const roles = [
	'guest',
	'member',
	'admin',
	'super'
];

function get(userId) {
	return new Promise((resolve, reject) => {
		Users.getUser(userId)
			.then((user) => resolve(user.roles))
			.catch((err) => reject(err));
	});
}

function can(userId, allow) {
	return new Promise((resolve, reject) => {
		Users.getUser(userId)
			.then((user) => {
				resolve(user);
			})
			.catch((err) => reject(err));
	});
}

passport.use(new BasicStrategy((username, password, next) => {
	Users.findUser(username)
		.then((user) => user.verifyPassword(password))
		.then((isMatch) => next((isMatch) ? null : new ApiError('not-authorized'), true))
		.catch((err) => next(new ApiError('not-authorized')));
}));

export const isAuthenticated = passport.authenticate('basic', { session : false });
