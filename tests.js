describe('simple-express-logger', function() {
  var logger;
  var mockReq = {method: 'GET', url: '/api/foo', headers: { foo: 1, bar: 2} };
  var mockRes = {};
  var mockNext = function () {};

  describe('no options', function() {
    var missingFieldError = 'Missing either the `method` or `url` field on the req object';
    beforeEach(function() {
      logger = require('./index')();
    });

    it('should log the correct statement for a request with a method and url', function() {
      spyOn(console, 'log');
      logger(mockReq, mockRes, mockNext);
      expect(console.log).toHaveBeenCalledWith('REQUEST: {' + mockReq.method + '} ' + mockReq.url);
    });

    it('should throw an error if the req object does not exist', function() {
      expect(logger).toThrowError('Missing req object');
    });
    it('should throw an error if the url field does not exist on the req object', function() {
      expect(function() {logger({ method: mockReq.method})}).toThrowError(missingFieldError);
    });
    it('should throw an error if the method field does not exist on the req object', function() {
      expect(function() {logger({ url: mockReq.url})}).toThrowError(missingFieldError);
    });
  });

  describe('options', function() {

    describe('customOutput', function() {
      it('should log through another function if one is specified as customOutput', function() {
        var options = { customOutput: function() {} };
        var logger = require('./index')(options);
        spyOn(options, 'customOutput');
        logger(mockReq, mockRes, mockNext);
        expect(options.customOutput).toHaveBeenCalled();
      });
      it('should throw an error if customOutput is not a function', function() {
        var options = { customOutput: 'foo' };
        var logger = require('./index')(options);
        expect(function() { logger(mockReq, mockRes, mockNext); }).toThrowError('`customOutput` was specified, but it was not a function');
      });
    });

    describe('extraFields', function() {
      it('should log the correct statement for a field which exists on the request object', function() {
        var options = { extraFields: ['headers'] };
        var logger = require('./index')(options);
        spyOn(console, 'log');
        logger(mockReq, mockRes, mockNext);
        expect(console.log).toHaveBeenCalledWith('headers: ' + JSON.stringify(mockReq.headers));
      });
      it('should throw an error for a field which does not exist on the request object', function() {
        var options = { extraFields: ['xhr'] };
        var logger = require('./index')(options);
        spyOn(console, 'log');
        expect(function() { logger(mockReq, mockRes, mockNext); }).toThrowError('The field `xhr` does not exist on the request object');
      });
    });

  });
});
