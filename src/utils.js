'use strict';

exports.getBigInt = function (key) {
  const value = this.getDataValue(key);
  try {
    return BigInt(value);
  } catch (err) {
    return value;
  }
};

exports.validateBigInt = function (value, helpers) {
  if (!['bigint', 'number'].includes(typeof value)) return helpers.error('any.invalid');
  return value;
};
