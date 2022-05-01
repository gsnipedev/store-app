const mongoose = require("mongoose");

const item_schema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  item_desc: {
    type: String,
    required: true,
  },
  item_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Items", item_schema);
