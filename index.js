var constants = require('./lib/constants');
var EasyDynamoDB = require('./lib/easyDynamoDb');

EasyDynamoDB.AttributeTypes = constants.AttributeTypes;
EasyDynamoDB.KeyTypes = constants.KeyTypes;
EasyDynamoDB.ProjectionTypes = constants.ProjectionTypes;
EasyDynamoDB.ReturnValues = constants.ReturnValues;
EasyDynamoDB.TableStatuses = constants.TableStatuses;
EasyDynamoDB.WaitForStates = constants.WaitForStates;

module.exports = EasyDynamoDB;