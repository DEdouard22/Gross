'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    frequency: DataTypes.STRING,
    autoPay: DataTypes.BOOLEAN,
    scheduledDay: DataTypes.DATE,
    clearedDate: DataTypes.DATE,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    incomeDebt: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User);
  };
  return Transaction;
};