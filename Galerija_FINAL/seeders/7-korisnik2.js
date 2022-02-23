'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const bcrypt = require('bcrypt');
      await queryInterface.bulkInsert('Users', [{
        username: 'Mika',
        password: bcrypt.hashSync('mika123', 10),
        user_type: '2',
        email: 'mika123@raf.rs',
        bio: 'Krajnji korisnik 2',
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
  }
};
