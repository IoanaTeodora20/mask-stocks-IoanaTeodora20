const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 800;

// -- Mongoose to MongoDB Connection ----
mongoose.connect(
  "mongodb+srv://admin:1234@maskstock.cpxqr71.mongodb.net/Mask_Stocks",
  () => {
    console.log("Connected to MongoDB");
  }
);

// ---- routes is the specified file meant for the GET,POST,PUT,DELETE requests, found in the Routes folder ----
const routes = require("./routes/routes");
app.use("/api", routes);

// ----- end of Mongoose to MongoDB Connection ----

app.listen(PORT, console.log(`http://127.0.0.1:${PORT}`));
