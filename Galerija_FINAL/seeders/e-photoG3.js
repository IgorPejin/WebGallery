'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Photos', [{
        name: 'Autmn',
        tags: 'Autmn,Sun,Colorful',
        original_size: '1280x853',
        original_ref: 'storage/g3/autmn.jpg',
        thumbnail_ref: 'storage/g3/t_autmn.jpg',
        extension: '.jpg',
        gallery_id:3
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Photos', null, {});
  }
};

