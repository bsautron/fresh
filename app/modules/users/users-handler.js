import UserService from './users-service';

export default {
	getUsers,
	getUser,
	postUser
};

function getUsers (req, res, next) {
	UserService.getUsers()
		.then((users) => res.json(users))
		.catch((err) => next(err));
}

function getUser (req, res, next) {
	UserService.getUser(req.params.userId)
		.then((user) => res.json(user))
		.catch((err) => next(err));
}

function postUser (req, res, next) {
	UserService.createUser(req.body)
		.then((user) => res.json(user))
		.catch((err) => next(err));
}
