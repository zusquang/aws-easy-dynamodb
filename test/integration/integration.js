var fs = require('fs');

var EasyDynamoDB = require('./../../index.js');

describe('EasyDynamoDB', function() {
    var TABLE_NAME = 'TestTable';
    var TABLE_HASH_KEY = 'TestTableHashKey';
    var TABLE_RANGE_KEY = 'TestTableRangeKey';

    var TABLE_FIELD_1 = 'TestTableField1';
    var TABLE_FIELD_2 = 'TestTableField2';

    var INDEX_NAME = 'TestTableIndex';

    var easyDynamoDb = new EasyDynamoDB(JSON.parse(fs.readFileSync('test/integration/automation.config', 'utf8')));

    beforeEach(function () {
        console.log('Creating table ' + TABLE_NAME);
        return easyDynamoDb.waitFor(TABLE_NAME, EasyDynamoDB.WaitForStates.TABLE_NOT_EXISTS)
            .then(function() {
                return easyDynamoDb.createTable({
                    AttributeDefinitions: [
                        {
                            AttributeName: TABLE_HASH_KEY,
                            AttributeType: EasyDynamoDB.AttributeTypes.STRING
                        },
                        {
                            AttributeName: TABLE_RANGE_KEY,
                            AttributeType: EasyDynamoDB.AttributeTypes.NUMBER
                        },
                        {
                            AttributeName: TABLE_FIELD_1,
                            AttributeType: EasyDynamoDB.AttributeTypes.NUMBER
                        },
                        {
                            AttributeName: TABLE_FIELD_2,
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
                    TableName: TABLE_NAME,
                    GlobalSecondaryIndexes: [
                        {
                            IndexName: INDEX_NAME,
                            KeySchema: [
                                {
                                    AttributeName: TABLE_FIELD_1,
                                    KeyType: EasyDynamoDB.KeyTypes.HASH
                                },
                                {
                                    AttributeName: TABLE_FIELD_2,
                                    KeyType: EasyDynamoDB.KeyTypes.RANGE
                                }
                            ],
                            Projection: {
                                ProjectionType: EasyDynamoDB.ProjectionTypes.ALL
                            },
                            ProvisionedThroughput: {
                                ReadCapacityUnits: 1,
                                WriteCapacityUnits: 1
                            }
                        }
                    ]
                })
            })
            .then(function () {
                return easyDynamoDb.waitFor(TABLE_NAME, EasyDynamoDB.WaitForStates.TABLE_EXISTS);
            });
    });

    afterEach(function () {
        console.log('Deleting table ' + TABLE_NAME);
        return easyDynamoDb.deleteTable(TABLE_NAME);
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

    it('should list tables', function () {
        return easyDynamoDb.listTables()
            .then(function (tables) {
                console.log('Found ' + tables.length + ' table(s): ' + tables);
            });
    });

    it('should change provisioned throughput', function () {
        return easyDynamoDb.changeProvisionedThroughput(TABLE_NAME, 5, 6)
            .then(function(data) {
                console.log('Table updated: ' + JSON.stringify(data));
            });
    });

    it('should create and delete a global secondary index', function () {
        return easyDynamoDb.deleteGlobalSecondaryIndex(TABLE_NAME, INDEX_NAME)
            .then(function () {
                console.log('Deleted global secondary index');
            });
    });
});