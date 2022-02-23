'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const bcrypt = require('bcrypt');
      await queryInterface.bulkInsert('Users', [{
        username: 'Pera',
        password: bcrypt.hashSync('pera123', 10),
        user_type: '2',
        email: 'pera123@raf.rs',
        bio: 'Krajnji korisnik 1',
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
  }
};
