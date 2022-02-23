'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privileges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.hasMany(Users,{ foreignKey: 'privilege_id', as: 'privilege', onDelete: 'cascade', hooks: true })
    }
  };
  Privileges.init({
    canUpload: DataTypes.BOOLEAN,
    canDelete: DataTypes.BOOLEAN,
    canUpdate: DataTypes.BOOLEAN,
    canCreateUser: DataTypes.BOOLEAN,
    canDeleteUser: DataTypes.BOOLEAN,
    canModifyUser: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Privileges',
  });
  return Privileges;
};