const express = require("express");
const dogsRoutes = express.Router();
const Dog = require("../models/Dog");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

dogsRoutes.get("/new", (req, res, next) => {
  res.render("dog/new");
});

dogsRoutes.post("/new", (req, res, next) => {
  const username = req.body.name;
  const age = req.body.age;
  const photo = req.body.photo;
  const owner = req.body.owner;
  const breed = req.body.breed;
  const size = req.body.size;
  if (
    username === "" ||
    age === "" ||
    photo === "" ||
    owner === "" ||
    breed === "" ||
    size === ""
  ) {
    res.render("dog/new", {
      message: "Please fill all the flields"
    });
    return;
  }

  Dog.findOne({ name }, "name", (err, user) => {
    const newDog = new Dog({
      name,
      age,
      photo,
      owner,
      breed,
      size
    });

    newDog.save(err => {
      if (err) {
        res.render("dog/new", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

dogsRoutes.get("/list", (req, res, next) => {
  Dog.find().then(dogs => {
    console.log(dogs)
    res.render("dog/list", {dogs});
  });
});
module.exports = dogsRoutes;
