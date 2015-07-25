var AWS = require('aws-sdk');
var Q = require('q');

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

EasyDynamoDB.prototype.batchGetItem = function(params, callback) {
    return run(this._dynamodb.batchGetItem.bind(this, params), callback);
};

EasyDynamoDB.prototype.batchWriteItem = function(params, callback) {
    return run(this._dynamodb.batchWriteItem.bind(this, params), callback);
};

EasyDynamoDB.prototype.createTable = function(params, callback) {
    return run(this._dynamodb.createTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.deleteItem = function(params, callback) {
    return run(this._dynamodb.deleteItem.bind(this, params), callback);
};

EasyDynamoDB.prototype.deleteTable = function(params, callback) {
    return run(this._dynamodb.deleteTable.bind(this, params), callback);
};

EasyDynamoDB.prototype.describeTable = function(params, callback) {
    return run(this._dynamodb.describeTable.bind(this, params), callback);
};

EasyDynamoDB.prototype.getItem = function(params, callback) {
    return run(this._dynamodb.getItem.bind(this, params), callback);
};

EasyDynamoDB.prototype.listTable = function(params, callback) {
    return run(this._dynamodb.listTable.bind(this, params), callback);
};

EasyDynamoDB.prototype.putItem = function(params, callback) {
    return run(this._dynamodb.putItem.bind(this, params), callback);
};

EasyDynamoDB.prototype.query = function(params, callback) {
    return run(this._dynamodb.query.bind(this, params), callback);
};

EasyDynamoDB.prototype.scan = function(params, callback) {
    return run(this._dynamodb.scan.bind(this, params), callback);
};

EasyDynamoDB.prototype.updateItem = function(params, callback) {
    return run(this._dynamodb.updateItem.bind(this, params), callback);
};

EasyDynamoDB.prototype.query = function(params, callback) {
    return run(this._dynamodb.query.bind(this, params), callback);
};

EasyDynamoDB.prototype.updateItem = function(params, callback) {
    return run(this._dynamodb.updateItem.bind(this, params), callback);
};

EasyDynamoDB.prototype.updateTable = function(params, callback) {
    return run(this._dynamodb.updateTable.bind(this, params), callback);
};

EasyDynamoDB.prototype.waitFor = function(state, params, callback) {
    return run(this._dynamodb.query.bind(this, state, params), callback);
};

module.exports = EasyDynamoDB;