require("dotenv").config();

const mongoose = require("mongoose");
const Breed = require("../models/Breed");

Breed.collection.drop();
Breed.create([
  {
    breed: "Golden Retreiver",
    isMixed: false
  },
  {
      breed: "Mixed",
      isMixed: true
  }
]).then(() => {
  console.log("Breeds created");
  mongoose.disconnect();
});
