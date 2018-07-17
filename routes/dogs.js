const express = require("express");
const dogsRoutes = express.Router();
const Dog = require("../models/Dog");
const multer = require('multer');
const upload = multer({ dest: "uploads/" });


dogsRoutes.get("/new", (req, res, next) => {
 res.render("dog/new", {message: req.flash("error")});

});

dogsRoutes.post("/new", upload.single('photo'), (req, res, next) => {
 const name = req.body.name;
 const age = req.body.age;
 const photo = req.file.path;
 const owner = req.body.owner;
 const breed = req.body.breed;
 const size = req.body.size;
 const description = req.body.description;
 const location = {type: 'Point', coordinates :[req.body.lat,req.body.lng]};
 if (
   name === "" ||
   age === "" ||
   photo === "" ||
   owner === "" ||
   breed === "" ||
   size === ""||
   description === ""
 ) {
   res.render("dog/new", {
     message: "Please fill all the flields"
   });
   return;
 }

 Dog.findOne({ name }, "name", (err, user,next) => {
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
   newDog.save()
   .then(() => {
    res.redirect("/dog/list");
  })
  .catch(err =>{
    req.flash("error", err.message)
    res.redirect("/dog/new")
  });
 });
});

dogsRoutes.get("/list", (req, res, next) => {
  Dog.find()
  .then(dogs => {/* console.log(dogs) */
    res.render("dog/list", {dogs});
  });
 });

 dogsRoutes.get('/delete/:id',(req,res) => {
  Dog.findByIdAndRemove(req.params.id)
  .then (() => {
    res.redirect('/dog/list')
  })
  .catch(err =>{
    req.flash("error", err.message)
    res.redirect("/dog/list")
  });
});


module.exports = dogsRoutes;