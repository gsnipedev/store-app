const { Sequelize, DataTypes, Model } = require("sequelize");
const sql = new Sequelize({
  host: "localhost",
  username: "root",
  database: "store-app-sql",
  dialect: "mysql",
  define: { freezeTableName: true },
});

module.exports = function () {
  return sql.define("ordered_items", {
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
