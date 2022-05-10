const { Sequelize, DataTypes, Model } = require("sequelize");
const sql = new Sequelize({
  host: "localhost",
  username: "root",
  database: "store-app-sql",
  dialect: "mysql",
  define: { freezeTableName: true },
});

module.exports = function () {
  return sql.define("orders", {
    order_id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merchant_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    transaction_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gross_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    va_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
