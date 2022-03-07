'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [15, 95]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },
    state: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 2]
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 5]
      }
    },
    businessImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
  };
  return Business;
};