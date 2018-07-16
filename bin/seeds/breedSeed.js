require("dotenv").config();

const mongoose = require("mongoose");
const Breed = require("../../models/Breed");

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to Mongo!");
    Breed.collection.drop();
    Breed.create([
      {
        breed: "Golden Retreiver"
      },
      {
        breed: "Mixed"
      },
      {
        breed: "Dachsund"
      }
    ]).then(() => {
      console.log("Breeds created");
      mongoose.disconnect();
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
