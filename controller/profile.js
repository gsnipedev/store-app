const orders = require("../model/sequelize/orders")();

exports.show_profile = async function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }
  const offset = req.query.offset || 0;
  const username = req.session.username;
  const format = new Intl.NumberFormat("id", { style: "currency", currency: "IDR" });
  const order_data = await orders.findAll({ where: { username: username }, limit: 8, offset: offset });
  res.render("profile.ejs", { response: order_data, format });
};
