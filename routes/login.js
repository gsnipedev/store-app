const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const Accounts = require("../model/acc_model");

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", async (req, res) => {
  try {
    const result = await Accounts.findOne({ username: req.body.username, password: req.body.password });
    if (result != null) {
      res.redirect("/");
    } else {
      res.render("login.ejs", { msg: "wrong username or password" });
    }
  } catch (error) {
    res.send("error");
  }
});

module.exports = router;
