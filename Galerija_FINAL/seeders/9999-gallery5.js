'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Galleries', [{
        name: 'Peta galerija',
        desc: 'Peta galerija slika',
        tags: 'Sunshine,Rainbows',
        media_type: 'wallpapers',
        user_id:3,
        thumbnail_ref:'storage/g5/g_thumbnail/t_dog.jpg'
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Galleries', null, {});
  }
};