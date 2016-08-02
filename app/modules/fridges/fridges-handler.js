import Fridges from './fridges-service';
import logger from '../../utils/logger';

const log = logger('fridges');

export default {
	getFridges,
	getUserFridge,
	getUserFridges,
	postUserFridge
};

function getFridges (req, res, next) {
	Fridges.getFridges()
		.then((fridges) => res.json(fridges))
		.catch((err) => next(err));
}

function getUserFridge (req, res, next) {
	const userId = req.params.userId;
	const fridgeId = req.params.fridgeId;

	Fridges.getUserFridge(userId, fridgeId)
		.then((fridge) => res.json(fridge))
		.catch((err) => next(err));
}

function getUserFridges (req, res, next) {
	const userId = req.params.userId;

	Fridges.getUserFridges(userId)
		.then((fridges) => res.json(fridges))
		.catch((err) => next(err));
}

function postUserFridge (req, res, next) {
	Fridges.createUserFridge(req.params.userId, req.body)
		.then((fridge) => res.json(fridge))
		.catch((err) => next(err));
}
