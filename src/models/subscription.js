'use strict';
const {
  Model
} = require('sequelize');
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
      autoIncrement: false
    },
    source: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    r_login: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    r_source: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    }
  }, {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscription',
    underscored: true,
  });
  return Subscription;
};