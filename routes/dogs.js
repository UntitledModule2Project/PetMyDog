const express = require("express");
const dogsRoutes = express.Router();
const Dog = require("../models/Dog");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

dogsRoutes.get("/new", (req, res, next) => {
  res.render("dog/new", { message: req.flash("error") });
});

dogsRoutes.post("/new", upload.single("photo"), (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  const photo = req.file.path;
  const owner = req.body.owner;
  const breed = req.body.breed;
  const size = req.body.size;
  const description = req.body.description;
  const location = { type: "Point", coordinates: [req.body.lat, req.body.lng] };
  if (
    name === "" ||
    age === "" ||
    photo === "" ||
    owner === "" ||
    breed === "" ||
    size === "" ||
    description === ""
  ) {
    res.render("dog/new", {
      message: "Please fill all the flields"
    });
    return;
  }

  Dog.findOne({ name }, "name", (err, user, next) => {
    const newDog = new Dog({
      name,
      age,
      photo,
      owner,
      breed,
      size,
      description,
      location
    });
    newDog
      .save()
      .then(() => {
        res.redirect("/dog/list");
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/dog/new");
      });
  });
});

dogsRoutes.get("/list", (req, res, next) => {
  Dog.find().then(dogs => {
    res.render("dog/list", { dogs });
  });
});

//EDIT
dogsRoutes.get("/edit/:id", (req, res) => {
  Dog.findById(req.params.id).then(dog => {
    res.render("dog/edit", { dog });
  });
});

dogsRoutes.post("/edit/:id", upload.single("photo"), (req, res) => {
  const { name, age, owner, breed, size, description } = req.body;
  const location = { type: "Point", coordinates: [req.body.lat, req.body.lng] };
  const photo = req.file.path;
  Dog.findByIdAndUpdate(req.params.id, {
    name,
    age,
    photo,
    owner,
    breed,
    size,
    description,
    location
  })
    .then(() => {
      res.redirect("/dog/list");
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("/dog/edit");
    });
});

//DELETE
dogsRoutes.get("/delete/:id", (req, res) => {
  Dog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/dog/list");
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("/dog/list");
    });
});

//DOG PROFILE
dogsRoutes.get("/dogProfile/:id", (req, res) => {
  console.log(req.params)
  Dog.findById(req.params.id).then(dog => {
    res.render("dog/dogProfile", { dog });
  });
});

module.exports = dogsRoutes;
