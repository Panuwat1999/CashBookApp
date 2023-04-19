const mongoose = require("mongoose");
const users = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  fullname: { type: String },
});

module.exports = mongoose.model("users", users);
