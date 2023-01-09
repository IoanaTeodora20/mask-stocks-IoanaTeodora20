const express = require("express");
const router = express.Router();

// import Hospital from "../ModelSchemas/hospitalSchema.js";
const Hospital = require("../ModelSchemas/hospitalSchema");

router.get("/", async (req, res) => {
  const hospitals = await Hospital.find();
  console.log(hospitals);
  res.json(hospitals);
});

module.exports = router;
