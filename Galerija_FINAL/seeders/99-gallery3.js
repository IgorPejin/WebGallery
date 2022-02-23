'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Galleries', [{
        name: 'Treca galerija',
        desc: 'Treca galerija slika',
        tags: 'Sunshine,Rainbows',
        media_type: 'wallpapers',
        user_id:3,
        thumbnail_ref:'storage/g3/g_thumbnail/t_footbal.jpg'
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Galleries', null, {});
  }
};