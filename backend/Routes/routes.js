const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const passport = require("passport");

const Hospital = require("../DataSchema/hospitalSchema");
const User = require("../DataSchema/userSchema");
const Product = require("../DataSchema/productSchema");

// router.get("/", async (req, res) => {
//   const hospitalList = await Hospital.find();
//   const userList = await User.find();
//   const productList = await Product.find();
//   res.json(userList);
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({ message: "No User Exists" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({ message: "Logged In" });
      });
    }
  })(req, res, next);
});

router.get("/user", (req, res) => {
  // console.log(req.user);
  res.send(req.user);
});

router.delete("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged Out" });
  });
});

router.post("/hospitalList", async function (req, res) {
  if (req.body.hospitals) {
    let userLists = [];
    const hospitalData = [];
    for (let item of req.body.hospitals) {
      const hospital = await Hospital.find({ name: item.name });
      userLists.push(hospital[0].users);
      hospitalData.push(hospital[0]);
    }
    console.log(userLists);
    let result = [];
    for (let i = 0; i < userLists.length; i++) {
      for (let j = 0; j < userLists[i].length; j++) {
        if (userLists[i][j].email == req.body.email && userLists[i][j].admin) {
          // console.log(userLists[i][j]);
          console.log(hospitalData);
          //req.body.hospitals[i],
          result.push(hospitalData[i]);
          break;
        }
      }
    }
    res.json({ result: result });
  } else {
    res.json({ result: "pa" });
  }
});

router.get("/usersList", async function (req, res) {
  const usersList = await User.find();
  res.json(usersList);
});

router.get("/productList", async function (req, res) {
  const productList = await Product.find();
  res.json(productList);
});

module.exports = router;
