const express = require("express");
const router = express.Router();

const Hospital = require("../ModelSchemas/hospitalSchema.js");

router.get("/", async (req, res) => {
    const hospitals = await Hospital.find();
    console.log(hospitals);
    res.json(hospitals);
});

module.exports = router;
