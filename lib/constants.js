exports.AttributeTypes = {
    STRING: 'S',
    NUMBER: 'N',
    BINARY: 'B'
};

exports.KeyTypes = {
    HASH: 'HASH',
    RANGE: 'RANGE'
};

exports.ProjectionTypes = {
    ALL: 'ALL',
    KEYS_ONLY: 'KEYS_ONLY',
    INCLUDE: 'INCLUDE'
};

exports.ReturnValues = {
    NONE: 'NONE',
    ALL_OLD: 'ALL_OLD',
    UPDATED_OLD: 'UPDATED_OLD',
    ALL_NEW: 'ALL_NEW',
    UPDATED_NEW: 'UPDATED_NEW'
};

exports.TableStatuses = {
    ACTIVE: "ACTIVE",
    CREATING: "CREATING",
    UPDATING: "UPDATING",
    DELETING: "DELETING"
};

exports.WaitForStates = {
    TABLE_EXISTS: 'tableExists',
    TABLE_NOT_EXISTS: 'tableNotExists'
};

