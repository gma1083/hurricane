var express = require('express');
var router = express.Router();

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

router.get('/Jobs', function(req, res, next){
  res.render('jobs', {title : 'Jobs'});
});

module.exports = router;
