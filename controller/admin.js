const Items = require("../model/sequelize/items")();
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
