import config from '../../config';
import errorsCommun from './errors-commun';

const moduleFolder = '../../modules';
let errorsAvailable = errorsCommun;

Object.assign(errorsAvailable, errorsCommun);
for (const mod of config.modules) {
	Object.assign(errorsAvailable, require(`${moduleFolder}/${mod}-errors`).default);
}

export default class ApiError extends Error {
	constructor(slug) {
		super(slug);

		const err = errorsAvailable[slug];
		if (!err) throw `Error [${slug}] does not exist`;

		this.short = slug;
		this.code = err.code;
		this.status = err.status;
		this.description = err.description;
	}
}
