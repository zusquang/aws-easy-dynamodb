var AWS = require('aws-sdk');
var Q = require('q');
var marshaler = require('dynamodb-marshaler');
var _ = require('lodash');

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
    if (_.isFunction(callback)) {
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

/**
 * Make a callback-based function return a promise instead.
 * @param func
 * @returns {*|promise}
 */
function promisify(func) {
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

/**
 * Fails with the given error.
 * If a callback is provided, run it. Otherwise return a rejected promise.
 * @param e
 * @param callback
 * @returns {*}
 */
function error(e, callback) {
    if(_.isFunction(callback)) {
        callback(e);
    } else {
        return Q.reject(e);
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

    if (_.isUndefined(params.Key)) {
        return error(new Error('Parameters must contain a "Key" object'), callback);
    }

    params.Key = toDynamoDbFormat(params.Key);

    var _convert = function(data) {
        if (data && data.Attributes) {
            data.Attributes = fromDynamoDbFormat(data.Attributes);
        }
        return data;
    };

    if (_.isFunction(callback)) {
        this._dynamodb.deleteItem(params, function (err, data) {
            callback(err, _convert(data));
        });
    } else {
        return promisify(this._dynamodb.deleteItem.bind(this._dynamodb, params))
            .then(_convert);
    }
};

EasyDynamoDB.prototype.deleteTable = function(params, callback) {
    return run(this._dynamodb.deleteTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.describeTable = function(params, callback) {
    return run(this._dynamodb.describeTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.getItem = function(params, callback) {

    if (_.isUndefined(params.Key)) {
        return error(new Error('Parameters must contain a "Key" object'), callback);
    }
    params.Key = toDynamoDbFormat(params.Key);

    var _convert = function(data) {
        if (data && data.Item) {
            data.Item = fromDynamoDbFormat(data.Item);
        }
        return data;
    };

    if (_.isFunction(callback)) {
        this._dynamodb.getItem(params, function (err, data) {
            callback(err, _convert(data));
        });
    } else {
        return promisify(this._dynamodb.getItem.bind(this._dynamodb, params))
            .then(_convert);
    }
};

EasyDynamoDB.prototype.listTables = function(params, callback) {
    return run(this._dynamodb.listTables.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.putItem = function(params, callback) {

    if (_.isUndefined(params.Item)) {
        return error(new Error('Parameters must contain an "Item" object'), callback);
    }
    params.Item = toDynamoDbFormat(params.Item);

    var _convert = function(data) {
        if (data && data.Attributes) {
            data.Attributes = fromDynamoDbFormat(data.Attributes);
        }
        return data;
    };

    if (_.isFunction(callback)) {
        this._dynamodb.putItem(params, function (err, data) {
            callback(err, _convert(data));
        });
    } else {
        return promisify(this._dynamodb.putItem.bind(this._dynamodb, params))
            .then(_convert);
    }
};

EasyDynamoDB.prototype.query = function(params, callback) {
    return run(this._dynamodb.query.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.scan = function(params, callback) {
    return run(this._dynamodb.scan.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.updateItem = function(params, callback) {

    if (_.isUndefined(params.Key)) {
        return error(new Error('Parameters must contain a "Key" object'), callback);
    }

    params.Key = toDynamoDbFormat(params.Key);

    var _convert = function(data) {
        if (data && data.Attributes) {
            data.Attributes = fromDynamoDbFormat(data.Attributes);
        }
        return data;
    };

    if (_.isFunction(callback)) {
        this._dynamodb.updateItem(params, function (err, data) {
            callback(err, _convert(data));
        });
    } else {
        return promisify(this._dynamodb.updateItem.bind(this._dynamodb, params))
            .then(_convert);
    }
};

EasyDynamoDB.prototype.updateTable = function(params, callback) {
    return run(this._dynamodb.updateTable.bind(this._dynamodb, params), callback);
};

EasyDynamoDB.prototype.waitFor = function(state, params, callback) {
    return run(this._dynamodb.waitFor.bind(this._dynamodb, state, params), callback);
};

module.exports = EasyDynamoDB;