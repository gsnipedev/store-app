const express = require("express");
const router = express.Router();
const Items = require("../model/mongoose/items_model");
const admin = require("../controller/admin");

router.get("/admin", async (req, res) => {
  if (req.session.rank != "Admin") return res.redirect("back");
  res.render("admin.ejs");
});
router.post("/admin", (req, res, next) => {
  // getDownloadURL(storageRef).then((url) => {
  //   console.log(url);
  // });
  next();
});
router.post("/admin", admin.admin_add_item);
router.post("/admin", (req, res) => {
  res.redirect("back");
});

module.exports = router;
