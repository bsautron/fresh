import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';

import logger, {stream} from './app/utils/logger';
import config from './app/config';
import routes from './app/routes';
import packageJson from './package.json';

const log = logger('app');

mongoose.Promise = global.Promise;

log.info(`Starting app: ${packageJson.name} [${packageJson.version}]`);

const app = express()
	.set('title', packageJson.name)
	.set('version', packageJson.version)
	.set('description', packageJson.description)
	.set('port', config.port)
	.use(bodyParser.urlencoded({ extended: false }))
	.use(morgan('tiny', { 'stream': stream }))
	.use('/', routes());

mongoose.connect(config.db)
	.then(() => {
		log.info(`DB connected to ${config.db}`);
		return app.listen(config.port);
	}).then(() => {
		log.info(`App listening on ${app.get('port')}`);
	});
