const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  zip_code: { type: String },
});

module.exports = mongoose.model("Mask_StockDetails", stockSchema);
