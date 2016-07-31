import config from '../../config';
import errorsCommun from './errors-commun';
import logger from '../logger';

const moduleFolder = '../../modules';
let errorsAvailable = errorsCommun;

Object.assign(errorsAvailable, errorsCommun);
for (const mod of config.modules) {
	Object.assign(errorsAvailable, require(`${moduleFolder}/${mod}-errors`).default);
}

export default class ApiError {
	constructor(slug) {

		const err = errorsAvailable[slug];

		if (!err) return logger.error(`Error [${slug}] does not exist`);
		if (!err.status) return logger.error(`Error [${slug}] can't be set`);

		this.short = slug;
		this.code = err.code;
		this.description = err.description;

		Object.defineProperty(this, 'status', {
			enumerable: false,
			configurable: false,
			writable: false,
			value: err.status
		});
	}

	add(slug) {
		this.errors = this.errors || [];

		if (typeof slug === 'string') {
			const err = errorsAvailable[slug];

			if (!err) return logger.error(`Error [${slug}] does not exist`);
			if (err.status) return logger.error(`Error [${slug}] can't be pushed`);

			this.errors.push({
				short: slug,
				code: err.code,
				description: err.description
			});
		}
		else this.errors.push(slug);
	}
}
