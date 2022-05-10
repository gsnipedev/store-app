const { Sequelize, DataTypes, Model } = require("sequelize");
const sql = new Sequelize({
  host: "localhost",
  username: "root",
  database: "store-app-sql",
  dialect: "mysql",
  define: { freezeTableName: true },
});

module.exports = function () {
  return sql.define("user_account", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.STRING,
      defaultValue: "User",
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING,
      defaultValue: "https://picsum.photos/200/300",
      allowNull: false,
    },
  });
};
