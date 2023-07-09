'use strict';
const {
  Model
} = require('sequelize');
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
      autoIncrement: false
    },
    source: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    balance_usd: DataTypes.DOUBLE,
    balance_usd_sub: DataTypes.DOUBLE,
    subscribers_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
    tableName:'account',
    underscored: true,
  });
  return Account;
};