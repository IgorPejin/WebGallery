'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const bcrypt = require('bcrypt');
      await queryInterface.bulkInsert('Users', [{
        username: 'Admin',
        password: bcrypt.hashSync('admin123', 10),
        user_type: '1',
        email: 'ipejin8420@raf.rs',
        bio: 'Krajnji admin korisnik',
        privilege_id:1
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
  }
};
