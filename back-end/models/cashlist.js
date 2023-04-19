const mongoose = require("mongoose");
const cashLists = new mongoose.Schema({
  cash_type: { type: String },
  cash_name: { type: String },
  cash_amount: { type: Number },
  cash_date: { type: Date },
});

module.exports = mongoose.model("cashLists", cashLists);
