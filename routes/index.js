const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.ejs", { msg: "Hello World - INDEX" });
});

module.exports = router;
