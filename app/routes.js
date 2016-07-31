import express from 'express';

import config from './config';
import logger from './utils/logger';

const moduleFolder = './modules';

function routering () {
	const app = express().use((req, res, next) => {
		if (req.method == 'POST') res.status(201);
		next();
	});

	for (const mod of config.modules) {
		const routes = require(`${moduleFolder}/${mod}-routes`).default;

		logger.info(`Available module: ${mod}`);

		for (const route of routes) {
			const method = route.method;
			const path = route.path;
			const handler = route.handler;

			logger.debug(`Set path: ${method} ${path}`);
			app[method.toLowerCase()](path, handler);
		}
	}

	app.use((err, req, res, next) => {
		logger.error(err);
		res.status(err.status || 500);
		res.json(err);
	});

	return app;
}

export default routering;
