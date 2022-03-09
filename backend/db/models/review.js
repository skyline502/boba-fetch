'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1,
        max: 5
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE'});
    Review.belongsTo(models.Business, { foreignKey: 'businessId', onDelete: 'CASCADE'});
  };
  return Review;
};
