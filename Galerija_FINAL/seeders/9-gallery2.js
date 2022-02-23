'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Galleries', [{
        name: 'Druga galerija',
        desc: 'Druga galerija slika',
        tags: 'Basketball,Video games',
        media_type: 'wallpapers',
        user_id:4,
        thumbnail_ref:'storage/g2/g_thumbnail/t_footbal.jpg'
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Galleries', null, {});
  }
};

