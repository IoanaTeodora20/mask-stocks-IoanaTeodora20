const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: String },
  price: { type: String },
});

module.exports = new mongoose.model("Product", productSchema);
