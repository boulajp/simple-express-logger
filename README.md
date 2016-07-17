# simple-express-logger [![Build Status](https://travis-ci.org/boulajp/simple-express-logger.svg?branch=master)](https://travis-ci.org/boulajp/simple-express-logger.svg?branch=master)
##Description
Logs requests to the console in a format like this: `Request: {GET} /api/foo`

NOTE: This simply logs every request coming into the server, not just requests who's routes have been handled in express

##Usage
1. Install via npm: ```$ npm install --save simple-express-logger```
2. Import the module, and use it as middleware
```javascript
var express = require('express');
var logger = require('simple-express-logger');

var app = express();
app.use(logger());
```

## API
**```logger([options])```**
&nbsp;&nbsp;&nbsp;&nbsp;* ```options``` `<Object`> Set of configurable options. Can have the following fields:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*```customOutput``` `<Function>` Function used in place of ```console.log```. Useful for externally redirecting the output.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*```extraFields``` `<Array String>` Set of field names on the ```req``` `<Object>` to also be logged. For example, an ```options``` object of ```{ extraFields: [ 'headers' ] }``` will log somthing similar to the following line: ```headers: "{ "foo": 1, "bar": 2 }"```
