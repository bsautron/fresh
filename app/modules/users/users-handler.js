import Users from './users-service';
import logger from '../../utils/logger';

const log = logger('users');

export default {
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser
};

function getUsers (req, res, next) {
	Users.getUsers()
		.then((users) => res.json(users))
		.catch((err) => next(err));
}

function getUser (req, res, next) {
	const userId = req.params.userId;

	Users.getUser(userId)
		.then((user) => res.json(user))
		.catch((err) => next(err));
}

function postUser (req, res, next) {
	Users.createUser(req.body)
		.then((user) => res.json(user))
		.catch((err) => next(err));
}

function putUser (req, res, next) {
	const userId = req.params.userId;
	const body = req.params.body;

	Users.updateUser(userId, body)
		.then((user) => res.json(user))
		.catch((err) => next(err));
}

function deleteUser (req, res, next) {
	const userId = req.params.userId;

	Users.deleteUser(userId)
		.then((user) => res.json(user))
		.catch((err) => next(err));
}
