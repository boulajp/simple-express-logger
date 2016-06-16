# simple-express-logger
An express logging middleware

#Description
Prints to console whenever express picks up an express to the port its listening to.
NOTE: Since this will log any request going through the port, its important to note that this doesn't mean that there is a route handler for this endpoint.
 
Logged message looks similar to this: `Request: {GET} /api/foo`

#Usage
Simply require the module, and use it as middleware
```javascript
var express = require('express');
var logger = require('simple-express-logger');

var app = express();
app.use(logger);
```


