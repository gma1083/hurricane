const database = require('../database');
const Timesheet = require('../timesheet');
const Employee = require('../employee');
const Job = require('../job');
const collectionName = 'TimeSheets';
const mongodb = require('mongodb');

async function insertTime(timeSheetData) {
    const timesheetValues = {};
    const employeeID = await Employee.nameToId(timeSheetData.name);
    const job = await Job.findByNumber(timeSheetData.jobNumber);
    let jobID = null;
    if(job !== null) jobID = job._id;

    Object.assign(timesheetValues, timeSheetData);

    timesheetValues.date = new Date(timeSheetData.date);

    timesheetValues.employeeID = employeeID;
    timesheetValues.jobID = jobID;
    
    const timesheet = new Timesheet(timesheetValues);
    return timesheet.save();
}

async function updateTimesheet(timeSheetData) {
    timeSheetData._id = new mongodb.ObjectID(timeSheetData._id);
    
    const timesheet = new Timesheet(timeSheetData);
    await timesheet.updateOne();
}

module.exports = {
    insertTime,
    updateTimesheet,
};