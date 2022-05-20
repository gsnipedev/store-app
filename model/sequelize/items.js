const { Sequelize, DataTypes, Model } = require("sequelize");
const sql = new Sequelize({
  host: "localhost",
  username: "root",
  database: "store-app-sql",
  dialect: "mysql",
  define: { freezeTableName: true },
});

module.exports = function () {
  return sql.define("items", {
    item_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    item_name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 1,
        max: 50,
      },
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    item_desc: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 1,
        max: 255,
      },
    },
    item_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
