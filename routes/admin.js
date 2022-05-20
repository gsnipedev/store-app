const express = require("express");
const router = express.Router();
const Items = require("../model/mongoose/items_model");
const admin = require("../controller/admin");

router.get("/admin", admin.admin_open_menu);
router.post("/admin", (req, res, next) => {
  // getDownloadURL(storageRef).then((url) => {
  //   console.log(url);
  // });
  next();
});
router.get("/admin/:paymentDetails", admin.admin_payment_details_check);
router.post("/admin", admin.admin_add_item);
router.post("/admin", (req, res) => {
  res.redirect("back");
});

module.exports = router;
