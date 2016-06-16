var logger = function(req, res, next) {
	console.log('Endpoint hit: {' + req.method + '} ' + req.url);
	next();
}

module.exports = logger; 
