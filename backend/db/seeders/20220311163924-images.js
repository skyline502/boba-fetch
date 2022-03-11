'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
     {
       title: 'A1 from Happy Lemon',
       description: 'One of the best drinks at Happy lemon',
       imgUrl:'https://lh3.googleusercontent.com/-K47k92-7fRg/Ttl-R7t2K2I/AAAAAAAALeY/SL8li0-6SN4/s800/Happy-Lemon.jpg',
       businessId: 1,
       userId: 1
     },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
