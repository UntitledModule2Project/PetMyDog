const express = require("express");
const dogsRoutes = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Comment = require("../models/Comment");

//SIGN DOG UP
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
      message: "Please fill all the fields"
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

//EDIT DOG
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

//DELETE DOG
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
  const user = req.params.user_id;
  const dog = req.params.dog_id;
  const title = req.body.title;
  const comment = req.body.comment;
  Dog.findById(req.params.id).then(dog => {
    Comment.find({dog_id:req.params.id})
    .populate('user_id')
    .then(comments=>{
      res.render("dog/dogProfile", { user, dog, title, comments })
    })
});
});

//USER COMMENTS

//CREATE NEW COMMENTS

dogsRoutes.post("/dogProfile/:id/comment/new", (req, res, next) => {
  console.log(req.body.title, req.body.comment, req.params.id, req.user);
  const user_id = req.user._id;
  const dog_id = req.params.id;
  const title = req.body.title;
  const comment = req.body.comment;

  if (title === "" || comment === "") {
    res.render("comment/new", {
      message: "Please don't leave the fields blank!"
    });
    return;
  }
  const newComment = new Comment({
    user_id,
    dog_id,
    title,
    comment
  });
  console.log(newComment);
  newComment
    .save()
    .then((comment) => {
      console.log(comment)
      res.redirect("/dog/dogProfile/" + dog_id);
    })
    .catch(err => {
      req.flash("error", err.message);
    });
});



module.exports = dogsRoutes;

