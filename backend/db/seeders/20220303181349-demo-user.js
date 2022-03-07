'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: '/images/baby-yoda-eggs.gif'
      },
      {
        email: 'user1@user.io',
        username: 'Johnny',
        hashedPassword: bcrypt.hashSync('password1234'),
        profileImg: ''
      },
      {
        email: 'user2@user.io',
        username: 'Skyline2011',
        hashedPassword: bcrypt.hashSync('password1234'),
        profileImg: ''
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
