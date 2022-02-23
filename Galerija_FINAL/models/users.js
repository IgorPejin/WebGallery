'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Gallery,Privileges}) {
      this.hasMany(Gallery, { foreignKey: 'user_id', as: 'galleries', onDelete: 'cascade', hooks: true });
      this.belongsTo(Privileges,{foreignKey: 'privilege_id', as: 'privileges', onDelete: 'cascade', hooks: true})
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    user_type: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    privilege_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users'
  });
  return Users;
};