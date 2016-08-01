import winston from 'winston';

winston.emitErrs = true;

const winstonLogger = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: './logs/all-logs.log',
			handleExceptions: true,
			json: true,
			maxsize: 5242880, //5MB
			maxFiles: 5,
			colorize: false
		}),
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			humanReadableUnhandledException: true,
			json: false,
			colorize: true
		})
	],
	exitOnError: true
});

const logger = (prefix) => {
	return {
		info(...messages) {
			winstonLogger.info(((prefix) ? (prefix + ': ') : '') + messages.join(' '));
		},
		error(...messages) {
			winstonLogger.error(((prefix) ? (prefix + ': ') : '') + messages.join(' '));
		},
		debug(...messages) {
			winstonLogger.debug(((prefix) ? (prefix + ': ') : '') + messages.join(' '));
		}
	};
};

const stream = {
	write(message, encoding) {
		winstonLogger.info('express:', message);
	}
};

export default logger;
export {stream};
