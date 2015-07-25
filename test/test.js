var fs = require('fs');

var chai = require('chai');
chai.should();

var EasyDynamoDB = require('./../index.js');

var dynamoDb = new EasyDynamoDB(JSON.parse(fs.readFileSync('automation.config', 'utf8')));

describe('EasyDynamoDB', function() {
    describe('createTable', function() {
        it('should create table', function () {
            var params = {
                AttributeDefinitions: [{
                    AttributeName: 'Test',
                    AttributeType: 'S'
                }],
                KeySchema: [{
                    AttributeName: 'Test',
                    KeyType: 'HASH'
                }],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                },
                TableName: 'TestTable'
            };
            return dynamoDb.createTable(params);
        })
    });
});