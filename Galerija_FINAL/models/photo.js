'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Gallery}) {
      this.belongsTo(Gallery,{foreignKey: 'gallery_id', as: 'gallery'})
    }
  };
  Photo.init({
    name: DataTypes.STRING,
    tags: DataTypes.STRING,
    original_size: DataTypes.STRING,
    original_ref: DataTypes.STRING,
    thumbnail_ref: DataTypes.STRING,
    extension: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};