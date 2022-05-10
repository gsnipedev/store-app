const Items = require("../model/sequelize/items")();
const comments = require("../model/sequelize/comments")();
const accounts = require("../model/sequelize/account")();
const { Op, Sequelize } = require("sequelize");
const { loadScript } = require("@paypal/paypal-js");
const midtransClient = require("midtrans-client");
const sql = new Sequelize({
  host: "localhost",
  username: "root",
  database: "store-app-sql",
  dialect: "mysql",
  define: { freezeTableName: true },
});

exports.discover_detail = async function (req, res) {
  try {
    const items = await Items.findOne({ where: { item_id: req.params.item_id } });
    const suggestion = await Items.findAll({
      where: { item_name: { [Op.like]: items.item_name } },
      offset: 1,
      limit: 3,
    });
    const [comment, metadata] = await sql.query(
      `SELECT * FROM comment INNER JOIN user_account ON comment.username=user_account.username WHERE item_id =${req.params.item_id}`
    );
    //console.log(comment);
    res.render("item_detail.ejs", { items: items, suggestions: suggestion, comments: comment });
  } catch (err) {
    console.log("ERROR " + err);
    res.redirect("/");
  }
};

exports.buy_now = async function (req, res) {
  if (!req.session.username) {
    res.redirect("login");
  }
  try {
    const item_id = req.query.item_id;
    const result = await Items.findOne({ where: { item_id: item_id } });
    res.render("buy_now.ejs", { result });
  } catch (error) {
    res.redirect("back");
  }
};
