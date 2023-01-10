const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  zip_code: { type: String },
  city: { type: String },
  country: { type: String },
  users: [{ email: { type: String }, admin: { type: Boolean } }],
});

module.exports = mongoose.model("Hospital", hospitalSchema);
