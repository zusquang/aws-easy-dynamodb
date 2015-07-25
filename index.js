var AWS = require('aws-sdk');
var Q = require('q');
var marshaler = require('dynamodb-marshaler');

function EasyDynamoDB(options) {
    this._dynamodb = new AWS.DynamoDB(options);
}

/**
 * Run the given function.
 * If a callback is provided, run it. Otherwise return a promise.
 * @param func
 * @param callback
 * @returns {*|promise}
 */
function run(func, callback) {
    if (typeof callback === 'function') {
        func(callback);
    } else {
        var deferred = Q.defer();

        func(function (err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    }
}

function toDynamoDbFormat(toMarshal) {
    return marshaler.marshalItem(toMarshal);
}

function fromDynamoDbFormat(toUnmarshal) {
    return marshaler.unmarshalItem(toUnmarshal);
}

EasyDynamoDB.prototype.batchGetItem = function(params, callback) {
    return run(this._dynamodb.batchGetItem.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.batchWriteItem = function(params, callback) {
    return run(this._dynamodb.batchWriteItem.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.createTable = function(params, callback) {
    return run(this._dynamodb.createTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.deleteItem = function(params, callback) {

    params.Key = toDynamoDbFormat(params.Key);

    return run(this._dynamodb.deleteItem.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.deleteTable = function(params, callback) {
    return run(this._dynamodb.deleteTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.describeTable = function(params, callback) {
    return run(this._dynamodb.describeTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.getItem = function(params, callback) {

    params.Key = toDynamoDbFormat(params.Key);

    return run(this._dynamodb.getItem.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.listTables = function(params, callback) {
    return run(this._dynamodb.listTables.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.putItem = function(params, callback) {

    params.Item = toDynamoDbFormat(params.Item);

    return run(this._dynamodb.putItem.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.query = function(params, callback) {
    return run(this._dynamodb.query.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.scan = function(params, callback) {
    return run(this._dynamodb.scan.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.updateItem = function(params, callback) {

    params.Key = toDynamoDbFormat(params.Key);

    return run(this._dynamodb.updateItem.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.updateTable = function(params, callback) {
    return run(this._dynamodb.updateTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.waitFor = function(state, params, callback) {
    return run(this._dynamodb.waitFor.bind(this._dynamodb, state, params), callback);
};

module.exports = EasyDynamoDB;