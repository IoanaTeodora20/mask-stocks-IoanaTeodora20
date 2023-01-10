const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: String },
  zip_code: { type: String },
  city: { type: String },
  country: { type: String },
  hospitals: [{ name: { type: String } }],
});

module.exports = mongoose.model("User", userSchema);
