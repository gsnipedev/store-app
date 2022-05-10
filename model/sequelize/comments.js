const { Sequelize, DataTypes, Model } = require("sequelize");
const sql = new Sequelize({
  host: "localhost",
  username: "root",
  database: "store-app-sql",
  dialect: "mysql",
  define: { freezeTableName: true },
});

module.exports = function () {
  return sql.define("comment", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        min: 1,
        max: 255,
      },
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
