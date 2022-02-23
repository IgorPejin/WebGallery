'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Photo}) {
      this.belongsTo(Users, {foreignKey: 'user_id', as: 'user'});
      this.hasMany(Photo,{ foreignKey: 'gallery_id', as: 'photos', onDelete: 'cascade', hooks: true })
    }
  };
  Gallery.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    tags: DataTypes.STRING,
    media_type: DataTypes.STRING,
    thumbnail_ref: DataTypes.STRING,
    user_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};