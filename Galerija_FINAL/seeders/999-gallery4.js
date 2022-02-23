'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Galleries', [{
        name: 'Cetvrta galerija',
        desc: 'Cetvrta galerija slika',
        tags: 'Sunshine,Rainbows',
        media_type: 'wallpapers',
        user_id:3,
        thumbnail_ref:'storage/g4/g_thumbnail/t_dog.jpg'
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Galleries', null, {});
  }
};