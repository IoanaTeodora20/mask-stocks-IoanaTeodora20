const mongoose = require("mongoose");

module.exports = new mongoose.model(
    "Product",
    new mongoose.Schema({
        name: { type: String },
        quantity: { type: String },
        price: { type: String },
    })
);
