var AWS = require('aws-sdk');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var Q = require('q');

chai.should();
chai.use(sinonChai);

var EasyDynamoDB = require('./../../index.js');

describe('EasyDynamoDB', function () {

    var awsDynamoDb = new AWS.DynamoDB();

    var easyDynamoDb = new EasyDynamoDB();
    easyDynamoDb._dynamodb = awsDynamoDb;

    describe('batchGetItem', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'batchGetItem', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.batchGetItem.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.batchGetItem({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.batchGetItem({}, function () {
                done();
            });
        });
    });

    describe('batchWriteItem', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'batchWriteItem', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.batchWriteItem.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.batchWriteItem({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.batchWriteItem({}, function () {
                done();
            });
        });
    });

    describe('createTable', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'createTable', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.createTable.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.createTable({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.createTable({}, function () {
                done();
            });
        });
    });

    describe('deleteItem', function () {

        var deleteParams;

        var deleteItemStub;

        beforeEach(function () {
            deleteParams = {
                Key : {
                    'HashKey': 'key'
                }
            };

            deleteItemStub = sinon.stub(awsDynamoDb, 'deleteItem', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            deleteItemStub.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.deleteItem(deleteParams);
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.deleteItem(deleteParams, function () {
                done();
            });
        });

        it('should reject promise if provided parameters does not contain Key section', function () {
            return easyDynamoDb.deleteItem({})
                .then(function () {
                    throw new Error('Should have failed without a Key')
                }, function () {
                    return;
                });
        });

        it('should fail callback if provided parameters does not contain Key section', function (done) {
            easyDynamoDb.deleteItem({}, function (err) {
                if (err) {
                    done();
                } else {
                    throw new Error('Should have failed without a Key');
                }
            })
        });

        it('should marshal Key section to DynamoDB format', function () {
            var promise = easyDynamoDb.deleteItem(deleteParams);

            deleteItemStub.should.have.been.calledWith({
                Key: {
                    'HashKey': {
                        S: 'key'
                    }
                }});

            return promise;
        });

        it('should un-marshal Attributes in response from DynamoDB', function () {
            // Overwrite stub
            deleteItemStub.restore();
            deleteItemStub = sinon.stub(awsDynamoDb, 'deleteItem', function (params, callback) {
                callback(null, {
                    Attributes: {
                        HashKey: {
                            S: 'key'
                        }
                    }});
            });

            return easyDynamoDb.deleteItem(deleteParams)
            .then(function(data) {
                data.should.be.deep.equal({
                    Attributes: {
                        HashKey: 'key'
                    }
                });
            });
        });
    });

    describe('deleteTable', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'deleteTable', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.deleteTable.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.deleteTable({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.deleteTable({}, function () {
                done();
            });
        });
    });

    describe('describeTable', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'describeTable', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.describeTable.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.describeTable({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.describeTable({}, function () {
                done();
            });
        });
    });

    describe('getItem', function () {

        var getParams;

        var getItemStub;

        beforeEach(function () {
            getParams = {
                Key: {
                    'HashKey': 'key'
            }};

            getItemStub = sinon.stub(awsDynamoDb, 'getItem', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            getItemStub.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.getItem(getParams);
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.getItem(getParams, function () {
                done();
            });
        });

        it('should reject promise if provided parameters does not contain Key section', function () {
            return easyDynamoDb.getItem({})
                .then(function () {
                    throw new Error('Should have failed without a Key')
                }, function () {
                    return;
                });
        });

        it('should fail callback if provided parameters does not contain Key section', function (done) {
            easyDynamoDb.getItem({}, function (err) {
                if (err) {
                    done();
                } else {
                    throw new Error('Should have failed without a Key');
                }
            })
        });

        it('should marshal Key section to DynamoDB format', function () {
            var promise = easyDynamoDb.getItem(getParams);

            getItemStub.should.have.been.calledWith({
                Key: {
                    'HashKey': {
                        S: 'key'
                    }
                }});

            return promise;
        });

        it('should un-marshal Item in response from DynamoDB', function () {
            // Overwrite stub
            getItemStub.restore();
            getItemStub = sinon.stub(awsDynamoDb, 'getItem', function (params, callback) {
                callback(null, {
                    Item: {
                        HashKey: {
                            S: 'key'
                        }
                    }});
            });

            return easyDynamoDb.getItem(getParams)
            .then(function(data) {
                data.should.be.deep.equal({
                    Item: {
                        HashKey: 'key'
                    }
                });
            });
        });
    });

    describe('listTables', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'listTables', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.listTables.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.listTables({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.listTables({}, function () {
                done();
            });
        });
    });

    describe('putItem', function () {

        var putParams;

        var putItemStub;

        beforeEach(function () {
            putParams = {
                Item: {
                    'HashKey': 'key'
            }};

            putItemStub = sinon.stub(awsDynamoDb, 'putItem', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            putItemStub.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.putItem(putParams);
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.putItem(putParams, function () {
                done();
            });
        });

        it('should reject promise if provided parameters does not contain Item section', function () {
            return easyDynamoDb.putItem({})
                .then(function () {
                    throw new Error('Should have failed without an Item')
                }, function () {
                    return;
                });
        });

        it('should fail callback if provided parameters does not contain Item section', function (done) {
            easyDynamoDb.putItem({}, function (err) {
                if (err) {
                    done();
                } else {
                    throw new Error('Should have failed without an Item');
                }
            })
        });

        it('should marshal Key section to DynamoDB format', function () {
            var promise = easyDynamoDb.putItem(putParams);

            putItemStub.should.have.been.calledWith({
                Item: {
                    'HashKey': {
                        S: 'key'
                    }
                }});

            return promise;
        });

        it('should un-marshal Attributes in response from DynamoDB', function () {
            // Overwrite stub
            putItemStub.restore();
            putItemStub = sinon.stub(awsDynamoDb, 'putItem', function (params, callback) {
                callback(null, {
                    Attributes: {
                        HashKey: {
                            S: 'key'
                        }
                    }});
            });

            return easyDynamoDb.putItem(putParams)
            .then(function(data) {
                data.should.be.deep.equal({
                    Attributes: {
                        HashKey: 'key'
                    }
                });
            });
        });
    });

    describe('query', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'query', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.query.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.query({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.query({}, function () {
                done();
            });
        });
    });

    describe('scan', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'scan', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.scan.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.scan({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.scan({}, function () {
                done();
            });
        });
    });

    describe('updateItem', function () {

        var updateParams;

        var updateItemStub;

        beforeEach(function () {
            updateParams = {
                Key : {
                    'HashKey': 'key'
            }};

            updateItemStub = sinon.stub(awsDynamoDb, 'updateItem', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            updateItemStub.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.updateItem(updateParams);
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.updateItem(updateParams, function () {
                done();
            });
        });

        it('should reject promise if provided parameters does not contain Key section', function () {
            return easyDynamoDb.updateItem({})
                .then(function () {
                    throw new Error('Should have failed without a Key')
                }, function () {
                    return;
                });
        });

        it('should fail callback if provided parameters does not contain Key section', function (done) {
            easyDynamoDb.updateItem({}, function (err) {
                if (err) {
                    done();
                } else {
                    throw new Error('Should have failed without a Key');
                }
            })
        });

        it('should marshal Key section to DynamoDB format', function () {
            var promise = easyDynamoDb.updateItem(updateParams);

            updateItemStub.should.have.been.calledWith({
                Key: {
                    'HashKey': {
                        S: 'key'
                    }
            }});

            return promise;
        });

        it('should un-marshal Attributes in response from DynamoDB', function () {
            // Overwrite stub
            updateItemStub.restore();
            updateItemStub = sinon.stub(awsDynamoDb, 'updateItem', function (params, callback) {
                callback(null, {
                    Attributes: {
                        HashKey: {
                            S: 'key'
                        }
                    }});
            });

            return easyDynamoDb.updateItem(updateParams)
                .then(function(data) {
                    data.should.be.deep.equal({
                        Attributes: {
                            HashKey: 'key'
                        }
                    });
                });
        });
    });

    describe('updateTable', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'updateTable', function (params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.updateTable.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.updateTable({});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.updateTable({}, function () {
                done();
            });
        });
    });

    describe('waitFor', function () {

        beforeEach(function () {
            sinon.stub(awsDynamoDb, 'waitFor', function (state, params, callback) {
                callback(null, {}); // Just make it not an error
            });
        });

        afterEach(function () {
            awsDynamoDb.waitFor.restore();
        });

        it('should allow the use of promises', function () {
            return easyDynamoDb.waitFor('state', {});
        });

        it('should allow the use of callbacks', function (done) {
            easyDynamoDb.waitFor('state', {}, function () {
                done();
            });
        });
    });

});