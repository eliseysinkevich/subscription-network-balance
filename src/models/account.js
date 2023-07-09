'use strict';
const {
  Model
} = require('sequelize');

const { getBigInt } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    login: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      validate: {
        isNumeric: true
      },
      get: getBigInt
    },
    source: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    balance_usd: DataTypes.DOUBLE,
    balance_usd_sub: DataTypes.DOUBLE,
    subscribers_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'account',
    underscored: true,
    timestamps: false
  });
  return Account;
};
