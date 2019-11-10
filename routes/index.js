var express = require('express');
var router = express.Router();

var timeSheetController = require('../source/controllers/timeSheetController');
var foremanController = require('../source/controllers/foremanController');
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
