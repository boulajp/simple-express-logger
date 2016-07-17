function loggerFactory(options) {
	var loggingFunction = (options && options.logger) ? options.logger : console.log.bind(console);

	return function logger(req, res, next) {
		logMainStatement(req, loggingFunction);
		if (options && options.extraFields)
			logExtraFields(req, loggingFunction, options.extraFields);
		next();
	};
}

function logMainStatement(req, loggingFunction) {
	loggingFunction('Request: {' + req.method + '} ' + req.url);
}

function logExtraFields(req, loggingFunction, extraFields) {
	extraFields.map(function(fieldName) {
		if (req[fieldName]) {
			var field = typeof req[fieldName] == 'object' ? JSON.stringify(req[fieldName]) : req[fieldName];
			console.log(fieldName + ': ' + field);
			
		}
	});
}

module.exports = loggerFactory;
