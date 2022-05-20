const Items = require("../model/sequelize/items")();
const Orders = require("../model/sequelize/orders")();
const Comments = require("../model/sequelize/comments")();
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "store-app-9ce99",
  keyFilename: "auth/key/store-app-9ce99-930e1c9d938a.json",
});
const myBucket = storage.bucket("store-app-9ce99.appspot.com");

async function uploadFile(filename, dest) {
  await myBucket.upload(filename, {
    destination: "product_images/" + dest,
  });
  console.log(`uploaded`);
}

exports.admin_add_item = async function (req, res, next) {
  const file = req.files.image_upload.tempFilePath;
  const name = Date.now() + "_" + req.files.image_upload.name;
  try {
    await uploadFile(file, name);
    const url = myBucket.file("product_images/" + name).publicUrl();
    const result = await Items.create({
      item_name: req.body.itemname,
      item_image: url,
      item_desc: req.body.itemdesc,
      price: req.body.item_price,
    });
  } catch (error) {
    res.send("Error");
  }

  next();
};

exports.upload_data = function (data) {
  console.log(data);
};

exports.admin_open_menu = async function (req, res) {
  const format = new Intl.NumberFormat("id", { style: "currency", currency: "IDR" });
  const filter = req.query.filter;
  let order_data = null;
  if (req.session.rank != "Admin") return res.redirect("back");
  if (filter) {
    order_data = await Orders.findAll({ where: { transaction_status: filter } });
  }
  order_data = await Orders.findAll({ limit: 6, offset: 0 });
  const comment_count = await Comments.count();
  res.render("admin.ejs", { response: order_data, comment_count, format });
};

exports.admin_payment_details_check = async function (req, res) {
  if (req.session.rank !== "Admin") return res.redirect("/");
  const order_id = req.query.orderId;
  const format = new Intl.NumberFormat("id", { style: "currency", currency: "IDR" });
  const response = await Orders.findOne({ where: { order_id: order_id } });
  res.render("admin_payment_details_check.ejs", { response, format });
};
