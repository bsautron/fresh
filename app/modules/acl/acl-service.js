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
	Users.findUser(username)
		.then((user) => {
			return user.verifyPassword(password).then((isMatch) => {
				next((isMatch) ? null : new ApiError('not-authorized'), user);
			});
		})
		.catch((err) => next(new ApiError('not-authorized')));
}));

export const isAuthenticated = passport.authenticate('basic', { session : false });
export const isAuthorized = (allows) => {
	return (req, res, next) => {
		log.debug(1);
		const questioner = req.user;
		log.debug(2);
		const targetId = req.params.userId;
		log.debug(3);
		const allow = allows[questioner.role];
		log.debug(4);
		const perms = (allow) ? allow.perms : [];
		log.debug(5);

		log.debug('questioner id =', questioner.id);
		log.debug('target id =', targetId);
		log.debug('questioner permissions =', perms);

		if (allow) {
			if (perms.includes('*')) return next();
			else if (perms.includes('own') && questioner.id == targetId) return next();
			else {
				Users.getUser(req.params.userId)
				.then((userTarget) => {
					if (perms.includes(userTarget.role)) {
						req.userTarget = userTarget;
						return next();
					}
					else return next(new ApiError('request-rejected'));
				}).catch((err) => next(err));
			}
		}
		else return next(new ApiError('request-rejected'));
	};
};
