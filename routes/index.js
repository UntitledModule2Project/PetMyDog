const express = require('express');
const router  = express.Router();
const Dog = require('../models/Dog');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {dogs:JSON.stringify(dogs)});
});


module.exports = router;