'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Galleries', {
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
      desc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      media_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Users',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      thumbnail_ref: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        defaultValue:Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE,
        
      },
      updatedAt: {
        defaultValue:Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Galleries');
  }
};