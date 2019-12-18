const db = require('../database');
const Timesheet = require('../timesheet');
const collection = 'TimeSheets';
const mongodb = require('mongodb');

async function returnTimeSheets() {
    return db.find({}, collection);
}

async function deleteTimeSheet(timeSheetID) {
    const timesheet = await Timesheet.findById(timeSheetID);
    await timesheet.delete();
}

async function getTimesheet(timeSheetID) {
    const timesheet = await Timesheet.findById(timeSheetID);
    return timesheet;
}

module.exports = {
    returnTimeSheets,
    deleteTimeSheet,
    getTimesheet,
};