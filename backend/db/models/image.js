'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 30]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 50]
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
    Image.belongsTo(models.Business, { foreignKey: 'businessId', onDelete: 'CASCADE', hooks: true, foreignKeyConstraint: true });
  };
  return Image;
};
