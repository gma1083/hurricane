var express = require('express');
var router = express.Router();
const https = require('https');

var timeSheetFormController = require('../source/controllers/timeSheetFormController');
var timeSheetsController = require('../source/controllers/timeSheetsController');
var foremenController = require('../source/controllers/foremenController');
var createAccountController = require('../source/controllers/createAccountController');
var loginController = require('../source/controllers/loginController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hurricane Hauling & Demolition, Inc' });
});

router.get('/createAccount', function(req, res, next) {
  res.render('createAccount', { title : 'Create Your Account'});
});

router.post('/createAccount', async function(req, res, next){
  try {
    let result = await createAccountController.createAccount(req.body);
  }
  catch(error) {
    throw error;
  }
    res.redirect('/');
});

router.get('/login', function(req, res, next){
  res.render('login', {title : 'Login Page'});
});

router.post('/login', async function(req, res, next){
  try {
    let result = await loginController.login(req.body);
  }
  catch(error) {
    throw error;
  }
 
  res.redirect('/');
});

router.get('/timeSheetForm', async function(req, res, next){
  let foremenArray = await foremenController.returnForemen();
  res.render('timeSheetForm', {title : 'Foreman HOURS Form', foremenArray : foremenArray});
});

router.post('/timeSheetForm', async function(req, res, next){
  try {
    console.log(JSON.stringify(req.body, null, 2));
    let result = await timeSheetFormController.insertTime(req.body);
    console.log(result);
  }
  catch(error) {
    throw error;
  }
    res.redirect('/');
});

router.get('/foremen', async function(req, res, next){
  let foremenArray = await foremenController.returnForemen();
  res.render('foremen', {title : 'Foreman List', foremenArray : foremenArray});
});

router.get('/timeSheets', async function(req, res, next){
  let timeSheetsArray = await timeSheetsController.returnTimeSheets();
  res.render('timeSheets', {title : 'Time Sheets List', timeSheetsArray : timeSheetsArray});
});

router.get('/timeSheets/:timeSheetsID', async function (req, res) {
  console.log("route");
  const timesheetID = req.params.timeSheetsID;
  await timeSheetsController.deleteTimeSheet(timesheetID);
  res.redirect('/timeSheets');
});

router.get('/Jobs', function(req, res, next){
  res.render('jobs', {title : 'Jobs'});
});

router.get('/api/foremen', async (req, res, next) => {
  let foremenArray = await foremenController.returnForemen();
  res.json(foremenArray);
});

router.get('/reddit', async (req, res, next) => {
  let httpsResult = await https.get("https://www.reddit.com/r/news/new.json?limit=1");
  let result = {data : JSON.stringify(httpsResult, null, 2)};
  res.render('reddit', result);
});

module.exports = router;
