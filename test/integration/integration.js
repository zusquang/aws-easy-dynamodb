var fs = require('fs');

var EasyDynamoDB = require('./../../index.js');

describe('EasyDynamoDB', function() {
    var TABLE_NAME = 'TestTable';
    var TABLE_HASH_KEY = 'TestTableHashKey';
    var TABLE_RANGE_KEY = 'TestTableRangeKey';

    var easyDynamoDb = new EasyDynamoDB(JSON.parse(fs.readFileSync('test/integration/automation.config', 'utf8')));

    beforeEach(function () {
        console.log('Creating table ' + TABLE_NAME);
        return easyDynamoDb.createTable({
            AttributeDefinitions: [
                {
                    AttributeName: TABLE_HASH_KEY,
                    AttributeType: EasyDynamoDB.AttributeTypes.STRING
                },
                {
                    AttributeName: TABLE_RANGE_KEY,
                    AttributeType: EasyDynamoDB.AttributeTypes.NUMBER
                }
            ],
            KeySchema: [
                {
                    AttributeName: TABLE_HASH_KEY,
                    KeyType: EasyDynamoDB.KeyTypes.HASH
                },
                {
                    AttributeName: TABLE_RANGE_KEY,
                    KeyType: EasyDynamoDB.KeyTypes.RANGE
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
            TableName: TABLE_NAME
        })
        .then(function () {
            return easyDynamoDb.waitFor(EasyDynamoDB.WaitForStates.TABLE_EXISTS, {
                TableName: TABLE_NAME
            });
        });
    });

    afterEach(function () {
        console.log('Deleting table ' + TABLE_NAME);
        return easyDynamoDb.deleteTable({
            TableName: TABLE_NAME
        });
    });

    it('should put, get, update and delete an item', function () {

        var itemHashKey = 'TestItemHashKey';
        var itemRangeKey = 5;

        var putItemParams = {
            Item: {},
            TableName: TABLE_NAME,
            ReturnValues: EasyDynamoDB.ReturnValues.ALL_OLD
        };
        putItemParams.Item[TABLE_HASH_KEY] = itemHashKey;
        putItemParams.Item[TABLE_RANGE_KEY] = itemRangeKey;

        var getItemParams = {
            Key: {},
            TableName: TABLE_NAME
        };
        getItemParams.Key[TABLE_HASH_KEY] = itemHashKey;
        getItemParams.Key[TABLE_RANGE_KEY] = itemRangeKey;

        var updateItemParams = {
            Key: {},
            TableName: TABLE_NAME,
            ReturnValues: EasyDynamoDB.ReturnValues.ALL_OLD
        };
        updateItemParams.Key[TABLE_HASH_KEY] = itemHashKey;
        updateItemParams.Key[TABLE_RANGE_KEY] = itemRangeKey;

        var deleteItemParams = {
            Key: {},
            TableName: TABLE_NAME,
            ReturnValues: EasyDynamoDB.ReturnValues.ALL_OLD
        };
        deleteItemParams.Key[TABLE_HASH_KEY] = itemHashKey;
        deleteItemParams.Key[TABLE_RANGE_KEY] = itemRangeKey;

        // Run test
        return easyDynamoDb.putItem(putItemParams)
        .then(function (data) {
            console.log('Put item ' + JSON.stringify(data));
            return easyDynamoDb.getItem(getItemParams);
        })
        .then(function (data) {
            console.log('Got item ' + JSON.stringify(data));
            return easyDynamoDb.updateItem(updateItemParams);
        })
        .then(function (data) {
            console.log('Updated item ' + JSON.stringify(data));
            return easyDynamoDb.deleteItem(deleteItemParams);
        })
        .then(function (data) {
            console.log('Deleted item ' + JSON.stringify(data));
        });
    });
});