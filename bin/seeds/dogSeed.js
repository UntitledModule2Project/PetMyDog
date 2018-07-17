require("dotenv").config();

const mongoose = require("mongoose");
const Dog = require("../../models/Dog");

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to Mongo!");
    Dog.collection.drop();
    Dog.create([
      {
        name: "Bob",
        age: 7,
        photo: "/images/bob.jpg",
        owner: "SaraV1988",
        breed: "Other",
        size: "Small",
        description: "Quirky and loveable, funky hair",
        location: {
          type: "Point",
          coordinates: [40.395765, -3.702646]
        }
      },
      {
        name: "Mia Wallace",
        age: 1,
        photo: "/images/dogplaying.jpg",
        owner: "Mateo1989",
        breed: "Rottweiler",
        size: "Large",
        description: "Sleepy Rottweiler puppy, a very good girl",
        location: {
          type: "Point",
          coordinates: [40.39253, -3.698672]
        }
      }
    ]).then(() => {
      console.log("Dogs created");
      mongoose.disconnect();
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
