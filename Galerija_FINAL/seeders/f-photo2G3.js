'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Photos', [{
        name: 'Dog',
        tags: 'Dog,Smile,White',
        original_size: '1920x2876',
        original_ref: 'storage/g3/dog.jpg',
        thumbnail_ref: 'storage/g3/t_dog.jpg',
        extension: '.jpg',
        gallery_id:3
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Photos', null, {});
  }
};
