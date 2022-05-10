if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const index = require("./routes/index");
const sign_control = require("./routes/sign_control");
const admin = require("./routes/admin");
const session = require("express-session");
const file_upload = require("express-fileupload");
const account_models = require("./model/sequelize/account");
const cart_models = require("./model/sequelize/cart");
const comments_models = require("./model/sequelize/comments");
const items_models = require("./model/sequelize/items");
const order_models = require("./model/sequelize/orders");
const ordered_items_models = require("./model/sequelize/ordered_items");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sql = new Sequelize({
  host: "localhost",
  username: "root",
  database: "store-app-sql",
  dialect: "mysql",
  define: { freezeTableName: true },
});

const account = account_models();
const cart = cart_models();
const comments = comments_models();
const items = items_models();
const orders = order_models();
const ordered_items = ordered_items_models();

account.hasOne(cart, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "username",
});
account.hasOne(comments, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "username",
});
account.hasOne(orders, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "username",
});
items.hasOne(ordered_items, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "item_id",
});
items.hasOne(cart, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "item_id",
});
items.hasOne(comments, {
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
  foreignKey: "item_id",
});
orders.hasOne(ordered_items, {
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: "order_id",
});

items.sync();
orders.sync();
ordered_items.sync();
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set("views", "views");
app.set("trust proxy", 1);
app.set("query parser");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.json());
app.use(file_upload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(
  session({
    secret: "gsnipe",
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true },
  })
);

exports.sql = { sql };

app.locals.account = "Login Here";
app.get("/", index);
app.use("/", index);
app.use("/", sign_control);
app.use("/", admin);
app.listen(process.env.PORT || 3000);
