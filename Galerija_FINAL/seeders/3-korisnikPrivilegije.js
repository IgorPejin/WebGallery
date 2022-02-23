'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Privileges', [{
       canUpload: true,
       canDelete: true,
       canUpdate: true,
       canCreateUser: false,
       canDeleteUser: false,
       canModifyUser: false
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Privileges', null, {});
  }
};
