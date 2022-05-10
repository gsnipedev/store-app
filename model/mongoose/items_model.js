const mongoose = require("mongoose");
const cmt = require("./commentModel");

const comment_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  comment_text: {
    type: String,
    maxlength: 255,
    required: true,
  },
});

const likes_schema = new mongoose.Schema({
  username: {
    type: String,
  },
});

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
  comments: [comment_schema],
  likes: [likes_schema],
});

module.exports = mongoose.model("Items", item_schema);
