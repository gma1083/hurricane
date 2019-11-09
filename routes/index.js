var express = require('express');
var router = express.Router();

var timeSheetController = require('../source/controllers/timeSheetController');
var foremanController = require('../source/controllers/foremanController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hurricane Hauling & Demolition, Inc' });
});

router.get('/timeSheet', async function(req, res, next){
  let foremanArray = await foremanController.returnForeman();
  res.render('timeSheet', {title : 'Foreman HOURS Form', foremanArray : foremanArray});
});

router.post('/timeSheet', async function(req, res, next){
  try {
    let result = await timeSheetController.insertTime(req.body);
  }
  catch(error) {
    
  }
    res.redirect('/');
});

router.get('/foreman', async function(req, res, next){
  let foremanArray = await foremanController.returnForeman();
  res.render('foreman', {title : 'Foreman List', foremanArray : foremanArray});
});

router.get('/Jobs', function(req, res, next){
  res.render('jobs', {title : 'Jobs'});
});

module.exports = router;
