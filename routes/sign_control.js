const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const sign_control = require("../controller/sign_control");

router.get("/login", (req, res) => {
  if (req.session.isLogin) {
    return res.redirect("/profile");
  }
  res.render("login.ejs", { layout: "layouts/layout-no-navbar.ejs" });
});

router.get("/logout", sign_control.logout);

router.post("/login", sign_control.login);
router.get("/register", sign_control.register);
router.post("/register", sign_control.register_post);

module.exports = router;
