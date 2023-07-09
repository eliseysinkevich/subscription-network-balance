'use strict';

exports.getBigInt = function (key) {
  const value = this.getDataValue(key);
  try {
    return BigInt(value);
  } catch (err) {
    return value;
  }
};
