const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 800;
const routes = require("./Routes/routes");

mongoose.connect(
    "mongodb+srv://admin:1234@maskstock.cpxqr71.mongodb.net/Mask_Stocks",
    () => {
        console.log("Connected to MongoDB");
    }
);

const app = express()
    .use(express.json())
    .use(cors())
    .use("/api", routes)
    .listen(PORT, console.log(`http://127.0.0.1:${PORT}`));
