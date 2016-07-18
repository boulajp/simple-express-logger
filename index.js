function loggerFactory(options) {
	return function logger(req, res, next) {
		throwErrorsIfNecessary(req, options);
		var shouldCallCustomFunction = options && options.customOutput;

		if (shouldCallCustomFunction) {
			logMainStatement(req, options.customOutput);
			if (options && options.extraFields)
				logExtraFields(req, options.customOutput, options.extraFields);
		}
		else {
			logMainStatement(req, console.log);
			if (options && options.extraFields)
				logExtraFields(req, console.log, options.extraFields);
		}
		next();
	};
}

function throwErrorsIfNecessary(req, options) {
	if (!req)
		throw new Error('Missing req object');
	if (!req.method || !req.url)
		throw new Error('Missing either the `method` or `url` field on the req object');
	if (options && options.customOutput && (typeof options.customOutput != 'function'))
		throw new Error('`customOutput` was specified, but it was not a function');
	if (options && options.extraFields) {
		options.extraFields.forEach(function(field) {
			if (!req[field])
				throw new Error('The field `xhr` does not exist on the request object');
		});
	}
}

function logMainStatement(req, loggingFunction) {
	loggingFunction('REQUEST: {' + req.method + '} ' + req.url);
}

function logExtraFields(req, loggingFunction, extraFields) {
	extraFields.map(function(fieldName) {
		if (req[fieldName]) {
			var field = typeof req[fieldName] == 'object' ? JSON.stringify(req[fieldName]) : req[fieldName];
			loggingFunction(fieldName + ': ' + field);
		}
	});
}

module.exports = loggerFactory;
