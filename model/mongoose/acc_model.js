const mongoose = require("mongoose");
const accounts = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 8,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("accounts", accounts);
