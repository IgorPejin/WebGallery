'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      original_size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      original_ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumbnail_ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      extension: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gallery_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Galleries',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        defaultValue:Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue:Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Photos');
  }
};