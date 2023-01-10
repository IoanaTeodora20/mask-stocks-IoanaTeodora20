const mongoose = require("mongoose");
const fs = require("fs");

mongoose
    .set("strictQuery", true)
    .connect(
        "mongodb+srv://admin:1234@maskstock.cpxqr71.mongodb.net/test",
        () => {
            console.log("Connected to MongoDB");
        }
    );

const Hospital = require("../ModelSchemas/hospitalSchema.js");
const User = require("../ModelSchemas/userSchema.js");
const Product = require("../ModelSchemas/productSchema.js");

async function sendDataIntoMongo() {
    await Hospital.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    try {
        const hospitalsList = JSON.parse(fs.readFileSync("./hospitals.json"));
        const usersList = JSON.parse(fs.readFileSync("./users.json"));
        const productsList = JSON.parse(fs.readFileSync("./products.json"));

        await Hospital.insertMany(hospitalsList);
        await User.insertMany(usersList);
        await Product.insertMany(productsList);
    } catch (e) {
        console.log(e);
    }
}

sendDataIntoMongo();
