var waitForStates = {
    TABLE_EXISTS: 'tableExists',
    TABLE_NOT_EXISTS: 'tableNotExists'
};

var returnValues = {
    NONE: 'NONE',
    ALL_OLD: 'ALL_OLD',
    UPDATED_OLD: 'UPDATED_OLD',
    ALL_NEW: 'ALL_NEW',
    UPDATED_NEW: 'UPDATED_NEW'
};

var keyTypes = {
    HASH: 'HASH',
    RANGE: 'RANGE'
};

var attributeTypes = {
    STRING: 'S',
    NUMBER: 'N',
    BINARY: 'B'
};

exports.decorate = function (toDecorate) {
    toDecorate.WaitForStates = waitForStates;
    toDecorate.ReturnValues = returnValues;
    toDecorate.KeyTypes = keyTypes;
    toDecorate.AttributeTypes = attributeTypes;
};
