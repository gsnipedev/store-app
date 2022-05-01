const express = require("express");
const router = express.Router();
const multer = require("multer");

const Items = require("../model/items_model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "_" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage });

router.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

router.post("/admin", upload.single("image_upload"), async (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  try {
    const result = await Items.insertMany({
      item_name: req.body.itemname,
      image_url: "uploads/" + req.file.filename,
      item_desc: req.body.itemdesc,
      item_price: req.body.item_price,
    });
  } catch (error) {
    console.log(error);
  }
  console.log(req.file);
  next();
});

router.post("/admin", async (req, res) => {
  // try {
  //   const result = await Items.findOne({ item_name: "dummyItem" });
  //   console.log(result.image_url);
  // } catch (error) {
  //   console.log("error");
  // }
  console.log("data masuk");
  res.redirect("back");
});

module.exports = router;
