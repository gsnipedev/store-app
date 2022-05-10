const Accounts = require("../model/sequelize/account")();

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
      res.render("login.ejs", { msg: "wrong username or password" });
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
