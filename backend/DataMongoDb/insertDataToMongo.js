// ---- importing the schemas and the data to fill the database ----
// import { connect } from "mongoose";
// import { readFileSync } from "fs";

// connect("mongodb+srv://admin:1234@maskstock.cpxqr71.mongodb.net/test", () => {
//   console.log("Connected to MongoDB");
// });

// import Hospital from "../ModelSchemas/hospitalSchema.js";
// import dataHospital from "./hospitals.json" assert { type: "json" };

// import User from "../ModelSchemas/userSchema.js";
// import dataUser from "./users.json" assert { type: "json" };

// import Product from "../ModelSchemas/productSchema.js";
// import dataProduct from "./products.json" assert { type: "json" };

// -----end of importing----

//--- async function to insert Data into MongoDB ----
// sendDataIntoMongo();
// async function sendDataIntoMongo() {
// ---- prevents duplicates being added into Mongo when the app runs---
// const deleteDuplicatesHosp = await Hospital.deleteMany();
// const deleteDuplicatesUser = await User.deleteMany();
// const deleteDuplicatesProd = await Product.deleteMany();
//   try {
//     const hospitalsList = JSON.parse(
//       readFileSync("./DataMongoDb/hospitals.json")
//     );
//     const usersList = JSON.parse(readFileSync("./DataMongoDb/users.json"));
//     const productsList = JSON.parse(
//       readFileSync("./DataMongoDb/products.json")
//     );
//     const addHospitalsMongo = await Hospital.insertMany(hospitalsList);
//     const addUsersMongo = await User.insertMany(usersList);
//     const addProductMongo = await Product.insertMany(productsList);
//   } catch (e) {
//     console.log(e);
//   }
// }

// ---- end of async function ----
