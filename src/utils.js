exports.getBigInt = function (key, options) {
  const value = this.getDataValue(key);
  try {
    return BigInt(value);
  } catch (err) {
    return value;
  }
};
