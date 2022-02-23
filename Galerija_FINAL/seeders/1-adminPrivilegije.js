'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Privileges', [{
       canUpload: true,
       canDelete: true,
       canUpdate: true,
       canCreateUser: true,
       canDeleteUser: true,
       canModifyUser: true
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Privileges', null, {});
  }
};
