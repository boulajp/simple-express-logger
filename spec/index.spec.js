describe('simple-express-logger', () => {
    let logger;
    const mockReq = { method: 'GET', url: '/api/foo', headers: { foo: 1, bar: 2 } };
    const mockRes = {};
    const mockNext = () => {};

    describe('no options', () => {
        const missingFieldError = 'Missing either the `method` or `url` field on the req object';

        beforeEach(() => {
            logger = require('../index')();
        });

        it('should log the correct statement for a request with a method and url', () => {
            spyOn(console, 'log');
            logger(mockReq, mockRes, mockNext);
            expect(console.log).toHaveBeenCalledWith(`REQUEST: {${mockReq.method}} ${mockReq.url}`);
        });

        it('should throw an error if the req object does not exist', () => {
            expect(logger).toThrowError('Missing req object');
        });

        it('should throw an error if the url field does not exist on the req object', () => {
            expect(() => { logger({ method: mockReq.method }); }).toThrowError(missingFieldError);
        });

        it('should throw an error if the method field does not exist on the req object', () => {
            expect(() => { logger({ url: mockReq.url }); }).toThrowError(missingFieldError);
        });
    });

    describe('options', () => {

        describe('customOutput', () => {
            it('should log through another function if one is specified as customOutput', () => {
                const options = { customOutput: () => {} };
                logger = require('../index')(options);
                spyOn(options, 'customOutput');
                logger(mockReq, mockRes, mockNext);
                expect(options.customOutput).toHaveBeenCalled();
            });

            it('should throw an error if customOutput is not a function', () => {
                const options = { customOutput: 'foo' };
                logger = require('../index')(options);
                expect(() => { logger(mockReq, mockRes, mockNext); }).toThrowError('`customOutput` was specified, but it was not a function');
            });
        });

        describe('extraFields', () => {
            it('should log the correct statement for a field which exists on the request object', () => {
                const options = { extraFields: ['headers'] };
                logger = require('../index')(options);
                spyOn(console, 'log');
                logger(mockReq, mockRes, mockNext);
                expect(console.log).toHaveBeenCalledWith('headers: ' + JSON.stringify(mockReq.headers));
            });

            it('should throw an error for a field which does not exist on the request object', () => {
                const options = { extraFields: ['xhr'] };
                logger = require('../index')(options);
                spyOn(console, 'log');
                expect(() => { logger(mockReq, mockRes, mockNext); }).toThrowError('The field `xhr` does not exist on the request object');
            });
        });

    });
});
