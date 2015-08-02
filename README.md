# easy-dynamodb

As its name implies, easy-dynamodb is a package meant to make working with DynamoDB easier and more productive - less time spent reading heavy API documentation, less lines of code, and less mistakes.

# Table of Contents
1. [Features](#Features)
2. [Getting Started](#GettingStarted)
3. [Promises And Callbacks](#PromisesAndCallbacks)
4. [API Reference](#APIReference)
  1. [Tables](#Tables)
  2. [Items](#Items)
  3. [Constants](#Constants)
5. [Integration Tests](#IntegrationTests)
6. [Changelog](#Changelog)

## <a id="Features"></a> Features
Everything the AWS DynamoDB SDK can do, easy-dynamodb can do -- only more easily. Here are some of the key features that easy-dynamodb offers:

 - Both promises and callbacks -- you get to choose
 - Simplified API -- you should be spending much less time going through documentation to understand what needs to get passed into functions
 - Constants for many of the strings the AWS SDK uses
 - Simplified return values -- no more clunky conversions, just get your data
 - Transparent treatment of cases where multiple calls to DynamoDB must be made (e.g. when `listTables` returns a large number of tables)

For more information on the underlying SDK, please refer to the [AWS DynamoDB SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) docs.

## <a id="GettingStarted"></a> Getting Started
In order to use easy-dynamodb, you first need to add it as a dependency of your Node project
```sh
npm install --save easy-dynamodb
```

You are now ready to write some code!
```javascript
var EasyDynamoDB = require('easy-dynamodb');

var easyDynamoDb = new EasyDynamoDB(/* Configuration */);
easyDynamoDb.createTable(/* Parameters */);
```

## <a id="PromisesAndCallbacks"></a> Promises _and_ Callbacks
With easy-dynamodb, you can freely use promises or callbacks wherever makes the most sense to you. Every function supports both with no added effort on your part. Simply provide a callback if you would like to use one, otherwise the function will return a promise you can use to run your next instruction.

If you like promises:
```javascript
easyDynamoDb.createTable(/* Parameters */)
.then(function (data) {
	console.log('We got data: ' + data);
})
.fail(function (err) {
	console.log('Uh oh: ' + err);
});
```

If you like callbacks:
```javascript
easyDynamoDb.createTable(/* Parameters */, function (err, data) {
	if (err) {
		console.log('Uh oh: ' + err);
	} else {
		console.log('We got data: ' + data);
	}
});
```

## <a id="APIReference"></a> API Reference
This document uses promises in its examples, but remember that [you can use both promises and callbacks](#PromisesAndCallbacks) interchangeably. 
### <a id="Tables"></a> Tables

#### changeProvisionedThroughput(_tableName_, _readThroughput_, _writeThroughput_ [,_callback_])

Modifies the provisioned read/write throughput on a table.

```javascript
easyDynamoDb.changeProvisionedThroughput('myTableName', 5, 6)
	.then(function() {
		console.log('Table throughput updated');
    });
```

__Returns__See [AWS docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property) for information on return values.

#### createTable (_parameters_ [,_callback_])
Creates a table in DynamoDB. See [AWS docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property) for information on expected parameters and return values.

```javascript
easyDynamoDb.createTable(/* Parameters */)
	.then(function(data) {
		console.log('Returned: ' + data);
	});
```

#### deleteTable (_tableName_ [,_callback_])
Deletes a table from DynamoDB. 

```javascript
easyDynamoDb.deleteTable('myTableName')
	.then(function(data) {
		console.log('Returned: ' + data);
	});
```

__Returns__: See [AWS docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteTable-property) for information on return values.

#### deleteGlobalSecondaryIndex (_tableName_, _indexName_ [,_callback_]

Removes a global secondary index from a table.

```javascript
easyDynamoDb.deleteGlobalSecondaryIndex('myTableName', 'myIndexName')
	.then(function () {
		console.log('Deleted global secondary index');
	});
```

__Returns__See [AWS docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property) for information on return values.

#### describeTable (_tableName_ [,_callback_])
Describe a table in DynamoDB. 

```javascript
easyDynamoDb.describeTable('myTableName')
	.then(function(data) {
		console.log('Returned: ' + data);
	});
```

__Returns:__ See [AWS docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteTable-property) for information on return values.

#### listTables ([_callback_])
List all tables in DynamoDB.

```javascript
easyDynamoDb.listTables()
	.then(function(data) {
		console.log('Returned: ' + data);
	});
```

#### waitFor(_tableName_, _state_ [,_callback_])

Waits for a table to be in the given [state](#WaitForStates).

```javascript
easyDynamoDb.waitFor('myTableName', EasyDynamoDB.WaitForStates.TABLE_EXISTS)
	.then(function() {
		console.log('Table is ready!')
	});
```


### <a id="Items"></a> Items
### <a id="Constants"></a> Constants
Easy-dynamodb provides constants for many of the strings the AWS SDK uses to help you maintain cleaner code and better programming habits.

#### <a id="EasyDynamoDB.AttributeTypes"></a> AttributeTypes
 - STRING
 - NUMBER
 - BINARY

```javascript
easyDynamoDb.createTable(
{
	AttributeDefinitions:
	[
		{
			AttributeName: 'myHashKey',
			AttributeType: EasyDynamoDB.AttributeTypes.STRING
		},
		{
			AttributeName: 'myRangeKey',
			AttributeType: EasyDynamoDB.AttributeTypes.NUMBER
		}
	]
	// Other parameters...
}
```

#### KeyTypes
 - HASH
 - RANGE
 
 ```javascript
 easyDynamoDb.createTable(
 {
	 KeySchema: 
	 [
	     {
	          AttributeName: 'myHashKey',
	          KeyType: EasyDynamoDB.KeyTypes.HASH
	      },
	      {
	          AttributeName: 'myRangeKey',
	          KeyType: EasyDynamoDB.KeyTypes.RANGE
	      }
      ]
      // Other parameters...
}
 ```

#### ProjectionTypes
 - ALL
 - KEYS_ONLY
 - INCLUDE
 
```javascript
easyDynamoDb.createTable({               
	GlobalSecondaryIndexes: [{                   
		Projection: {
			ProjectionType: EasyDynamoDB.ProjectionTypes.ALL
		}
    }]
    // Other parameters...
});
```

#### TableStatuses
- ACTIVE
- CREATING
- UPDATING
- DELETING

##### ReturnValues
 - NONE
 - ALL_OLD
 - UPDATED_OLD
 - ALL_NEW
 - UPDATED_NEW

```javascript
easyDynamoDb.getItem(
{
	ReturnValues: EasyDynamoDB.ReturnValues.ALL_OLD
	// Other parameters...
});
```

##### <a id='WaitForStates'></a>WaitForStates
 - TABLE_EXISTS
 - TABLE_NOT_EXISTS

```javascript
easyDynamoDb.waitFor(
	EasyDynamoDB.WaitForStates.TABLE_EXISTS,
	{
		TableName: 'myTable
	}
);
```

## <a id="IntegrationTests"></a> Integration Tests
If for some reason you would like to run the easy-dynamodb integration tests, check out the project and run npm install to get all the required dependencies. Then, create a file called `automation.config` under the `test` folder containing the configuration parameters you would normally pass to the EasyDynamoDB object. A basic example would be:

```json
{
  "accessKeyId": "abc123",
  "secretAccessKey": "abc1234567890",
  "region": "us-west-2"
}
```

Then simply,
```sh
cd test/integration
mocha
```

## <a id="Changelog"></a> Changelog
### 0.0.3 - August 2, 2015

Features:

 - `PutItem`, `GetItem`, `UpdateItem` and `DeleteItem` no longer return AttributeValues as part of their main response element ("Attributes"/"Item"). They now get un-marshalled back to a regular JS object
 - `describeTable`, `waitFor` and `deleteTable` have been simplified to use a table name string rather than an object
 - `listTables` now simply returns an array of table names, instead of an object
 - Split `updateTable` into more specific functions [__WIP__]
 - Adding some constants for AWS SDK strings

Misc:

 - PutItem, GetItem, UpdateItem and DeleteItem now produce errors if you call them without the bare minimum Key or Item object as part of your params
 - Major update to documentation. Hopefully not too heavy.

### 0.0.2 - July 25, 2015
Features:

 - PutItem, GetItem, UpdateItem and DeleteItem no longer require AttributeValues to be specified for their keys parameters. They now get marshalled to the correct format automatically.

Bug fixes:

 - Rename `listTable` to `listTables` and call correct underlying function
 - `waitFor` now calls correct underlying function
 - Fix context binding when calling underlying SDK to prevent "undefined is not a function" errors

### 0.0.1 - July 24, 2015
Initial release. 

Features:

 - All DynamoDB functionality from the AWS SDK can be used with callbacks or with promises.