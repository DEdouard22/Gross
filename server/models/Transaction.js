'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL(12,2),
    frequency: DataTypes.STRING,
    autoPay: DataTypes.BOOLEAN,
    scheduledDay: DataTypes.DATE,
    clearedDate: DataTypes.DATE,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    incomeDebt: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    recurring: DataTypes.BOOLEAN,
    savedAmount: DataTypes.DECIMAL(12,2)
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User);
  };
  return Transaction;
};