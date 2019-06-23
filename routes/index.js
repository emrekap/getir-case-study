var express = require('express');
var router = express.Router();
var recordController = require('../contollers/recordController');

router.post('/getRecords', recordController.getRecords);

router.get('/', function(req, res){
  res.send('Welcome. <a href="https://github.com/emrekap/getir-case-study">Github Repo</a> contains .env file for ease of use.');
});


module.exports = router;
