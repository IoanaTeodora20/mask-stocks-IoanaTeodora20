const mongoose = require("mongoose");

module.exports = new mongoose.model(
    "User",
    new mongoose.Schema({
        name: { type: String },
        email: { type: String },
        address: { type: String },
        zip_code: { type: String },
        city: { type: String },
        country: { type: String },
        hospitals: [{ name: { type: String } }],
    })
);
