'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Photos', [{
        name: 'Football',
        tags: 'Game,Football',
        original_size: '1920x1280',
        original_ref: 'storage/g2/Footbal.jpg',
        thumbnail_ref: 'storage/g2/t_Footbal.jpg',
        extension: '.jpg',
        gallery_id:2
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Photos', null, {});
  }
};
