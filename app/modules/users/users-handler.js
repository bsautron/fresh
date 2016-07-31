import Users from './users-service';

export default {
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser
};

function getUsers (req, res, next) {
	Users.getUsers()
		.then((users) => res.json(Users.frontList(users)))
		.catch((err) => next(err));
}

function getUser (req, res, next) {
	const userId = req.params.userId;

	Users.getUser(userId)
		.then((user) => res.json(Users.front(user)))
		.catch((err) => next(err));
}

function postUser (req, res, next) {
	Users.createUser(req.body)
		.then((user) => res.json(Users.front(user)))
		.catch((err) => next(err));
}

function putUser (req, res, next) {
	const userId = req.params.userId;
	const body = req.params.body;

	Users.updateUser(userId, body)
		.then((user) => res.json(Users.front(user)))
		.catch((err) => next(err));
}

function deleteUser (req, res, next) {
	const userId = req.params.userId;

	Users.deleteUser(userId)
		.then((user) => res.json(Users.front(user)))
		.catch((err) => next(err));
}
