const express = require("express");
const router = express.Router();
const Items = require("../model/items_model");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

router.get("/", async (req, res) => {
  try {
    const items = await Items.find({});
    res.render("index.ejs", { msg: "this is item", items: items });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/about", async (req, res) => {
  res.send("About");
});

router.get("/discover", async (req, res) => {
  try {
    const items = await Items.find({});
    res.render("discover_page.ejs", { msg: "this is item", items: items });
  } catch (error) {
    res.redirect(200, "/");
  }
});

router.get("/discover/:segment", async (req, res) => {
  try {
    const items = await Items.find({});
    res.render("item_detail.ejs", { msg: "this is item", items: items });
  } catch (error) {
    res.redirect("/");
  }
});

module.exports = router;
