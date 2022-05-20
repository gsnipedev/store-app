const Accounts = require("../model/sequelize/account")();
const validator = require("validator").default;
exports.login = async function (req, res) {
  try {
    const result = await Accounts.findOne({ where: { username: req.body.username, password: req.body.password } });
    if (result != null) {
      req.session.username = result.username;
      req.session.profile_image = result.profile_image;
      req.session.rank = result.rank;
      req.session.isLogin = true;
      console.log("Login as " + req.session.username);
      res.redirect("/");
    } else {
      res.render("login.ejs", { msg: "wrong username or password", layout: "layouts/layout-no-navbar" });
    }
  } catch (error) {
    res.send("error");
  }
};

exports.logout = function (req, res) {
  if (!req.session.username) {
    res.redirect("back");
    return;
  }

  req.session.destroy();
  res.redirect("/");
};

exports.register = function (req, res) {
  res.render("register.ejs", { layout: "layouts/layout-no-navbar" });
};
exports.register_post = async function (req, res) {
  const username = req.body.username;
  if (Accounts.findOne({ where: { username: username } })) {
    return res.render("register", { msg: "Username already taken, try again" });
  }
  const password = req.body.password;
  const password_confirm = req.body.password_confirm;
  console.log(username);

  if (username.length < 8 || username.length > 20) {
    return res.render("register", { msg: "Please use 8-20 digit username" });
  }
  if (password.length < 8 || password.length > 20) {
    return res.render("register", { msg: "Please use 8-20 digit password" });
  }
  if (password !== password_confirm) {
    return res.render("register", { msg: "Password does not match" });
  }

  await Accounts.create({ username: username, password: password });
  res.redirect("/");
};
