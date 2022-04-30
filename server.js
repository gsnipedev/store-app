if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const index = require("./routes/index");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set("views", "views");

app.use(express.static("public"));
app.use(expressLayouts);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log("connection error"));
db.once("open", () => console.log("connected to MongoDB"));

app.use("/", index);
app.listen(process.env.PORT || 3000);
