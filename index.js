var logger = function(req, res, next) {
	console.log('Request: {' + req.method + '} ' + req.url);
	next();
}

module.exports = logger; 
