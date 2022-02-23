'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const bcrypt = require('bcrypt');
      await queryInterface.bulkInsert('Users', [{
        username: 'Moderator',
        password: bcrypt.hashSync('moderator123', 10),
        user_type: '0',
        email: 'moderator@raf.rs',
        bio: 'Moderator korisnik',
        privilege_id:'2'
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('People', null, {});
  }
};
