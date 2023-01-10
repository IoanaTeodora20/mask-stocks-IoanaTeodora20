const mongoose = require("mongoose");

module.exports = new mongoose.model(
    "Hospital",
    new mongoose.Schema({
        name: { type: String },
        address: { type: String },
        zip_code: { type: String },
        city: { type: String },
        country: { type: String },
        users: [{ email: { type: String }, admin: { type: Boolean } }],
    })
);
