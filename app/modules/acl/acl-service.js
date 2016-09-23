import Users from '../users/users-service';
import ApiError from '../../utils/errors/api-error';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportHttp from 'passport-http';
import logger from '../../utils/logger';
import config from '../../config';

import jwt from 'jsonwebtoken';

const log = logger('acl');

const BasicStrategy = passportHttp.BasicStrategy;

export const roles = [
	'guest',
	'member',
	'admin',
	'super'
];


passport.use(new BasicStrategy((username, password, next) => {
	Users.findUserByUserName(username).select('password').exec()
		.then((user) => user.verifyPassword(password)
		.then((isMatch) => next((!isMatch) ? new ApiError('not-authorized') : null, user)))
		.catch((err) => next(new ApiError('not-authorized')));
}));

export const isAuthenticated = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) return next('no-token');

	jwt.verify(token, config.jwt.secret, {
		algorithm: config.jwt.algorithm
	}, (err, decoded) => {
		if (err || !decoded) return next(new ApiError('not-authorized'));

		req.user = decoded._doc;
		return next();
	});
};

// TODO: Blacklist jwt
export const isAuthorized = (allows) => {
	return (req, res, next) => {
		const questioner = req.user;
		const targetId = req.params.userId;
		const allow = allows[questioner.role];
		const perms = (allow) ? allow.perms : [];

		log.debug('questioner id =', questioner._id);
		log.debug('target id =', targetId);
		log.debug('questioner permissions =', perms);

		if (questioner.role == 'super') return next();
		if (!allow) return next(new ApiError('request-rejected'));
		if (perms.includes('*')) return next();
		if (perms.includes('own') && questioner._id == targetId) return next();

		Users.getUser(req.params.userId).then((userTarget) => {
			if (perms.includes(userTarget.role)) {
				req.userTarget = userTarget;
				next();
			}
			else next(new ApiError('request-rejected'));
		}).catch((err) => next(err));
	};
};
