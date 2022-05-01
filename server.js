if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to mongoose");
});

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const index = require("./routes/index");
const login = require("./routes/login");

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set("views", "views");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use("/", index);
app.use("/", login);
app.listen(process.env.PORT || 3000);
