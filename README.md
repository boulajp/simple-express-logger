# simple-express-logger [![Build Status](https://travis-ci.org/boulajp/simple-express-logger.svg?branch=master)](https://travis-ci.org/boulajp/simple-express-logger.svg?branch=master)
#Description
Logs requests to the console in a format like this: `Request: {GET} /api/foo`

NOTE: This simply logs every request coming into the server, not just requests who's routes have been handled in express

#Usage
1. Install via npm: ```$ npm install simple-express-logger```
2. Import the module, and use it as middleware
```javascript
var express = require('express');
var logger = require('simple-express-logger');

var app = express();
app.use(logger);
```


