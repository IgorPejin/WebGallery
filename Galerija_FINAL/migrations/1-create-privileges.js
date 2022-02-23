'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Privileges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      canUpload: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canUpdate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canCreateUser: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canDeleteUser: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      canModifyUser: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('Privileges');
  }
};