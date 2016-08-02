import FridgeSchema from './fridges-schema';
import ApiError from '../../utils/errors/api-error';
import logger from '../../utils/logger';

const log = logger('fridges');

export default {
	getFridge,
	getFridges,

	getUserFridge,
	getUserFridges,
	createUserFridge
};

function getFridge(fridgeId) {
	log.debug('getFridge');
	return FridgeSchema.find({_id: fridgeId});
}

function getFridges() {
	log.debug('getFridges');
	return FridgeSchema.find({});
}

function getUserFridges(userId) {
	log.debug('getUserFridges');
	return FridgeSchema.find({owner: userId});
}

function getUserFridge(userId, fridgeId) {
	log.debug('getUserFridge');
	return FridgeSchema.find({owner: userId, _id: fridgeId});
}

function createUserFridge(userId, body) {
	log.debug('getUserFridges');

	return new Promise((resolve, reject) => {
		body.owner = userId;
		const fridge = new FridgeSchema(body);

		fridge.save()
			.then((fridge) => resolve(fridge))
			.catch((err) => {
				let apiError;

				if (err.name == 'ValidationError') {
					apiError = new ApiError('fridge-validation-failed');

					for (let filed in err.errors) {
						apiError.add(err.errors[filed]);
					}
				}
				reject(apiError || err);
			});
	});
}
