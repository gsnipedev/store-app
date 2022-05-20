const orders = require("../model/sequelize/orders")();

exports.show_profile = async function (req, res) {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }
  const username = req.session.username;
  const format = new Intl.NumberFormat("id", { style: "currency", currency: "IDR" });
  const order_data = await orders.findAll({ where: { username: username } });
  res.render("profile.ejs", { response: order_data, format });
};
