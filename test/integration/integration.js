var fs = require('fs');

var chai = require('chai');
chai.should();

var EasyDynamoDB = require('./../../index.js');

describe('EasyDynamoDB', function() {
    var TABLE_NAME = 'TestTable';
    var TABLE_HASH_KEY = 'TestTableHashKey';

    var dynamoDb = new EasyDynamoDB(JSON.parse(fs.readFileSync('test/automation.config', 'utf8')));

    beforeEach(function () {
        return dynamoDb.createTable({
            AttributeDefinitions: [{
                AttributeName: TABLE_HASH_KEY,
                AttributeType: 'N'
            }],
            KeySchema: [{
                AttributeName: TABLE_HASH_KEY,
                KeyType: 'HASH'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
            TableName: TABLE_NAME
        })
        .then(function () {
            return dynamoDb.waitFor('tableExists', {
                TableName: TABLE_NAME
            });
        });
    });

    afterEach(function () {
        return dynamoDb.deleteTable({
            TableName: TABLE_NAME
        });
    });

    it('should put, get, update and delete an item', function () {

        var itemHashKey = 'TestItemHashKey';

        var putItemParams = {
            Item: {},
            TableName: TABLE_NAME
        };
        putItemParams.Item[TABLE_HASH_KEY] = 5;

        var getItemParams = {
            Key: {},
            TableName: TABLE_NAME
        };
        getItemParams.Key[TABLE_HASH_KEY] = itemHashKey;

        var updateItemParams = {
            Key: {},
            TableName: TABLE_NAME
        };
        updateItemParams.Key[TABLE_HASH_KEY] = itemHashKey;

        var deleteItemParams = {
            Key: {},
            TableName: TABLE_NAME
        };
        deleteItemParams.Key[TABLE_HASH_KEY] = itemHashKey;

        // Run test
        return dynamoDb.putItem(putItemParams)
        .then(function (data) {
            return dynamoDb.getItem(getItemParams);
        })
        .then(function (data) {
            return dynamoDb.updateItem(updateItemParams);
        })
        .then(function () {
            return dynamoDb.deleteItem(deleteItemParams);
        });
    });
});