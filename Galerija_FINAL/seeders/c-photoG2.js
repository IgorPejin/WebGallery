'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Photos', [{
        name: 'Basket',
        tags: 'Basketball,Outdoor,People',
        original_size: '1920x1281',
        original_ref: 'storage/g2/basket.jpg',
        thumbnail_ref: 'storage/g2/t_basket.jpg',
        extension: '.jpg',
        gallery_id:2
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Photos', null, {});
  }
};
