import Users from '../users/users-service';
import ApiError from '../../utils/errors/api-error';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportHttp from 'passport-http';
import logger from '../../utils/logger';

const log = logger('acl');

const BasicStrategy = passportHttp.BasicStrategy;

export const roles = [
	'guest',
	'member',
	'admin',
	'super'
];

passport.use(new BasicStrategy((username, password, next) => {
	Users.findUser(username).select('password').exec()
		.then((user) => user.verifyPassword(password)
		.then((isMatch) => next((!isMatch) ? new ApiError('not-authorized') : null, user)))
		.catch((err) => next(new ApiError('not-authorized')));
}));

export const isAuthenticated = passport.authenticate('basic', { session : false });
export const isAuthorized = (allows) => {
	return (req, res, next) => {
		const questioner = req.user;
		const targetId = req.params.userId;
		const allow = allows[questioner.role];
		const perms = (allow) ? allow.perms : [];

		log.debug('questioner id =', questioner.id);
		log.debug('target id =', targetId);
		log.debug('questioner permissions =', perms);

		if (questioner.role == 'super') return next();
		if (!allow) return next(new ApiError('request-rejected'));
		if (perms.includes('*')) return next();
		if (perms.includes('own') && questioner.id == targetId) return next();

		Users.getUser(req.params.userId).then((userTarget) => {
			if (perms.includes(userTarget.role)) {
				req.userTarget = userTarget;
				next();
			}
			else next(new ApiError('request-rejected'));
		}).catch((err) => next(err));
	};
};
