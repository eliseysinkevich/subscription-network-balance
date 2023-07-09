'use strict';
const {
  Model
} = require('sequelize');

const { getBigInt } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscription.init({
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
    r_login: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      validate: {
        isNumeric: true
      },
      get: getBigInt
    },
    r_source: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    }
  }, {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscription',
    underscored: true,
    timestamps: false
  });
  return Subscription;
};