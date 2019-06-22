var express = require('express');
var router = express.Router();
var recordController = require('../contollers/recordController');

router.post('/getRecords', recordController.getRecords);

module.exports = router;
