const express = require('express');
const router  = express.Router();
const multer = require('multer');
const upload = multer({ dest: "./public/uploads/" });
const Dog = require('../models/Dog');

/* GET home page */
router.get('/', (req, res, next) => {
  console.log(req.user)
  res.render('index');
});


module.exports = router;