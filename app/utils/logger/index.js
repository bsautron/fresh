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

	const loggerLevel = (level, prefix, messages) => winstonLogger[level](((prefix) ? (prefix + ': ') : '') + messages.join(' '));

	return {
		info: (...messages) => loggerLevel('info', prefix, messages),
		error: (...messages) => loggerLevel('error', prefix, messages),
		debug: (...messages) => loggerLevel('debug', prefix, messages)
	};
};

const stream = {
	write: (message, encoding) => winstonLogger.info('express:', message)
};

export default logger;
export {stream};
