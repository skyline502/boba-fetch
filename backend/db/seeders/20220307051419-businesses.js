'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Businesses', [
     {
       ownerId: 1,
       name: 'Happy Lemon',
       address: '311 N Capitol Ave Ste C',
       city: 'San Jose',
       state: 'CA',
       zipCode: '95133',
       businessImg: 'http://happylemonwest.com/wp-content/uploads/2020/09/cropped-HL-New-Logo-black-png.png',
       description: 'Happy Lemon has been providing tasty tea for over fifteen years.'
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Businesses', null, {});
  }
};
