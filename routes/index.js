const express = require('express');
const router = express.Router();
const https = require('https');

const timeSheetFormController = require('../source/controllers/timeSheetFormController');
const timeSheetsController = require('../source/controllers/timeSheetsController');
const foremenController = require('../source/controllers/foremenController');
const createAccountController = require('../source/controllers/createAccountController');
const loginController = require('../source/controllers/loginController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hurricane Hauling & Demolition, Inc' });
});

router.get('/createAccount', function(req, res, next) {
  res.render('createAccount', { title : 'Create Your Account'});
});

router.post('/createAccount', async function(req, res, next) {
  try {
    const result = await createAccountController.createAccount(req.body);
  }
  catch(error) {
    throw error;
  }
    res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('login', {title : 'Login Page'});
});

router.post('/login', async function(req, res, next) {
  try {
    const result = await loginController.login(req.body);
  }
  catch(error) {
    throw error;
  }
 
  res.redirect('/');
});

router.get('/timeSheetForm', async function(req, res, next) {
  const foremenArray = await foremenController.returnForemen();
  res.render('timeSheetForm', {title : 'Foreman HOURS Form', foremenArray : foremenArray});
});

router.post('/timeSheetForm', async function(req, res, next) {
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

router.get('/foremen', async function(req, res, next) {
  const foremenArray = await foremenController.returnForemen();
  res.render('foremen', {title : 'Foreman List', foremenArray : foremenArray});
});

router.get('/timeSheets', async function(req, res, next) {
  const timeSheetsArray = await timeSheetsController.returnTimeSheets();
  res.render('timeSheets', {title : 'Time Sheets List', timeSheetsArray : timeSheetsArray});
});

router.get('/timeSheets/delete/:timeSheetsID', async function (req, res) {
  const timesheetID = req.params.timeSheetsID;
  await timeSheetsController.deleteTimeSheet(timesheetID);
  res.redirect('/timeSheets');
});

// router.get('/timeSheets/edit/:timeSheetsID', async function(req, res) {
//   const timesheetID = req.params.timeSheetsID;
// });

router.get('/Jobs', async function(req, res, next) {
  const jobsArray = await jobsController.returnJobs();
  res.render('jobs', {title : 'Jobs', jobsArray : jobsArray});
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
