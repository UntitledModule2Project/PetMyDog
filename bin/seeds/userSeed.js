require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../../models/User");

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to Mongo!");
    User.collection.drop();
    User.create([
      {
        username: "saraienator",
        password: "123",
        email: "saraienator@gmail.com",
        hasDog: false
      },
      {
        username: "Mateo1979",
        password: "123",
        email: "mat@gmail.com",
        hasDog: false
      }
    ]).then(() => {
      console.log("Users created");
      mongoose.disconnect();
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
