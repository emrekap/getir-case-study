var Record = require("../models/recordModel");
var moment = require("moment-timezone");
var ServiceResult = require("../utils/serviceResult");



module.exports.getRecords = function(req, res, next) {
  var sr = new ServiceResult();
  console.log('req.body', req.body);
  var dateCriteria = {};
  var countCriteria = {};
  var aggregation = [];
  try {
    if ( typeof req.body.startDate !== "undefined" || typeof req.body.endDate !== "undefined" ) {
        dateCriteria.$match = { "createdAt": {}};
      if (typeof req.body.startDate !== "undefined") {
        dateCriteria.$match.createdAt.$gte = moment.tz(req.body.startDate, 'Europe/London').startOf("day").toDate()
      }
      if (typeof req.body.endDate !== "undefined") {
        dateCriteria.$match.createdAt.$lte = moment.tz(req.body.endDate, 'Europe/London').endOf("day").toDate()
      }
      aggregation.push(dateCriteria);
    }
    aggregation.push({ "$unwind": "$counts" });
    aggregation.push({
        "$group": {
            "_id": "$_id", 
            "totalCount": {
                "$sum": "$counts"
            },
            "createdAt": {
                "$max": "$createdAt"
            }
            ,
            "key": {
                "$max": "$key"
            }
        }
    });

    console.log("dateCriteria", dateCriteria);

    if ( typeof req.body.minCount !== "undefined" || typeof req.body.maxCount !== "undefined" ) {
        countCriteria.$match = { totalCount: {}};
      if (typeof req.body.minCount !== "undefined"&& parseInt(req.body.minCount, 10) > 0) {
        countCriteria.$match.totalCount.$gte = parseInt(req.body.minCount, 10);
      }
      if (typeof req.body.maxCount !== "undefined" && parseInt(req.body.maxCount, 10) > 0) {
        countCriteria.$match.totalCount.$lte = parseInt(req.body.maxCount, 10);
      }
      console.log(countCriteria);
      aggregation.push(countCriteria);
    }
    aggregation.push({ 
        "$project": {
            "_id" : 0,
        "totalCount": 1,
        "createdAt": 1,
        "key": 1
    }}
    );
    Record.aggregate(aggregation).limit(50).then(results => {
            //console.log('aggregation count', results);
            sr.records = results;
            res.json(sr);
    }).catch(err => {
        console.log(err);
    });
  } catch (error) {
      sr.success = ServiceResult.ERROR_INVALID_PARAMETER;
      sr.msg = 'Geçersiz parametre girdiniz';
      res.json(sr);
  }
};
