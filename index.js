var logger = function(req, res, next) {
	console.log('Endpoint hit: {' + req.method + '} ' + req.url);
}

module.exports = logger; 
