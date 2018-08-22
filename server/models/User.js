'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    saveGoal: DataTypes.DECIMAL(12,2),
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transaction);
  };
  return User;
};