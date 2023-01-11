const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const passport = require("passport");

// ---- import all the schemas needed to access the DB ----
const Hospital = require("../DataSchema/hospitalSchema");
const User = require("../DataSchema/userSchema");
const Product = require("../DataSchema/productSchema");
const Invoice = require("../DataSchema/invoiceSchema");
const Mask_StockDetails = require("../DataSchema/stockSchema");

/* ---- created basketData and cartData to store what we receive from the front-end, for then to get them on 
another request on the same endpoint ----*/

let basketData;
let cartData;
// ---- those are all of the requests done between Server and Front-End ----

/* ---- starting with the endpoints login, user, and logout.

Login - this route posts the data we get from front-end loginForm, then checks it against the database(to verify it),
        and only then, the req.logIn()gives us the user that is logged in;
User  - this route just sends us to the front-end the user we found on Login;
LogOut - this route deletes our user (which was stored Locally so it remains signed in even if refreshing)*/

// ---- end of routes for the whole passport login-logout ----

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

//---- the productData, usersList,productList,stockDetails,cartData,basketData routes give us all the data from our DB

router.get("/productData", async (req, res) => {
  const productList = await Product.find();
  res.json(productList);
});

router.get("/stockDetails", async function (req, res) {
  const stockDetails = await Mask_StockDetails.find();
  res.json(stockDetails);
});

router.get("/usersList", async function (req, res) {
  const usersList = await User.find();
  res.json(usersList);
});

router.get("/productList", async function (req, res) {
  const productList = await Product.find();
  res.json(productList);
});
router.get("/basketData", (req, res) => {
  res.json(basketData);
});

router.get("/cartData", (req, res) => {
  res.json(cartData);
});

// ---- end of sending to the front-end the pure, unaltered DB data ----

/* ---- Now things get complicated....


/hospitalList - this route gets from the frontend the Hospitals Data.
Since we need the Users from that Hospital object, we have to go through the object to get
and store our Users list into another list(usersList) to manipulate.

Only after that, we have to go through both lists to check if the email in the login is the same as the email in the Userlist
and if the user has admin=true, and if he has, we store the hospitals needed(only the hospitals avilable to the user)
in another list which we send back to the front-End*/

router.post("/hospitalList", async function (req, res) {
  if (req.body.hospitals) {
    let userLists = [];
    const hospitalData = [];
    for (let item of req.body.hospitals) {
      const hospital = await Hospital.find({ name: item.name });
      userLists.push(hospital[0].users);
      hospitalData.push(hospital[0]);
    }
    let result = [];
    for (let i = 0; i < userLists.length; i++) {
      for (let j = 0; j < userLists[i].length; j++) {
        if (userLists[i][j].email == req.body.email && userLists[i][j].admin) {
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

/* ---- /cartData - this route takes the amount of items we have in the frontend (the qty input in the card on /order)
and updates our product in the DB with the right quantity(what is left after we substract the input value) ---- */

router.post("/cartData", async function (req, res) {
  cartData = req.body;
  const products = await Product.find();

  const productListUpdated = await Product.findOneAndUpdate(
    { name: "Black KN95 Masks" },
    {
      $inc: { quantity: -req.body.amount },
    }
  );
  res.json(productListUpdated);
});

// ---- /basketData - this route stores our total price from frontend into the basketData global variable from earlier ----

router.post("/basketData", (req, res) => {
  basketData = req.body;
  res.json(req.body);
});

// ---- /invoiceData - this route sends our InvoiceForm Data into the DB ----

router.post("/invoiceData", async (req, res) => {
  const newInvoice = await new Invoice(req.body);
  await newInvoice.save();
});

// ---- end  of all the routes ----

module.exports = router;
