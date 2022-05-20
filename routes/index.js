const express = require("express");
const router = express.Router();
const Items = require("../model/sequelize/items")();
const accounts = require("../model/mongoose/acc_model");
const discover = require("../controller/discover");
const comments = require("../controller/comments");
const home = require("../controller/home");
const payment = require("../controller/payment");
const profile = require("../controller/profile");
const products = require("../controller/products");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

router.use(home.home);
router.get("/", async (req, res, next) => {
  //const comment_select = await Items.find({ item_name: "bruh" }).select("comments").count();
  //const query = await Items.aggregate([{ $match: { item_name: "ABC" } }]);
  //console.log(query);
  next();
});

router.get("/", async (req, res) => {
  try {
    console.log(req.query.name);
    const items = await Items.findAll();
    res.render("index.ejs", { items: items });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/about", async (req, res) => {
  res.render("about.ejs");
});

router.get("/discover", async (req, res) => {
  try {
    const items = await Items.findAll({ limit: 36 });
    res.render("discover_page.ejs", { msg: "this is item", items: items });
  } catch (error) {
    res.send(404, "/");
  }
});

router.get("/cart", (req, res) => {
  if (!req.session.username) return res.redirect("/login");
  res.render("cart.ejs");
});
router.get("/api/orders", async (req, res) => {
  const order = "asfasf";
  res.json(order);
});

router.get("/buy_now", discover.buy_now);

router.get("/profile", profile.show_profile);
router.get("/products", products.show_all);
router.get("/discover/:item_id", discover.discover_detail);
router.post("/comments/:item_id", comments.comment_post);
router.post("/about", (req, res) => {
  res.redirect("back");
});
router.get("/thankyou/1/:order_id", payment.payment_detail_bank_transfer);
router.get("/thankyou/2/:order_id", payment.payment_detail_emoney);
router.post("/pay/:payment_type", payment.payment_gateaway);
router.get("/bank-form", (req, res) => {
  const addr1 = req.query.addr1;
  const addr2 = req.query.addr2;
  res.render("bank-form.ejs", { item_id: req.query.item_id, addr1, addr2 });
});
router.get("/information-form", (req, res) => {
  const item_id = req.query.item_id;
  res.render("information_form.ejs", { item_id });
});
router.post("/api/notificationHandling", payment.notificationHandling);
router.post("/api/paymenthandler", payment.notificationHandler);

module.exports = router;
