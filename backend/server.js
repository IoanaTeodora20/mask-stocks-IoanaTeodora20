if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// ---- import the Schemas and Data to be placed in the DB ----
const Hospital = require("./DataSchema/hospitalSchema");
const hospitalData = require("./DataMongo/hospitals.json");

const User = require("./DataSchema/userSchema");
const userData = require("./DataMongo/users.json");

const Product = require("./DataSchema/productSchema");
const productData = require("./DataMongo/products.json");

// ---- end of import ----

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    //optionsuccessStatus solution for cors policy
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passport_config")(passport);

mongoose.connect("mongodb://localhost:27017/mask_stocks", () => {
  console.log("Connected to MongoDB");
});

// ---- the routes is the file with the GET,POST,PUT,DELETE req in the Routes folder ----
const routes = require("./Routes/routes");
app.use("/api", routes);

const PORT = 9000;

// ---- Async Function to insert data into DB ----

saveDataMongo();
async function saveDataMongo() {
  try {
    // ---- whenever the server starts, the DB will be filled with the same data again, and again.----
    // --- Therefore, we empty it first, then we add the data as many times as the server reloads ----
    const deleteDupHosp = await Hospital.deleteMany();
    const deleteDupUser = await User.deleteMany();
    const deleteDupProd = await Product.deleteMany();

    // --- the insert commands ----

    const hospitalList = await Hospital.insertMany(hospitalData);
    const userList = await User.insertMany(userData);
    const productList = await Product.insertMany(productData);
  } catch (e) {
    console.log(e);
  }
}

app.listen(PORT, console.log(`http://localhost:${PORT}`));
