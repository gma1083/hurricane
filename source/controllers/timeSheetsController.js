const db = require('../database');
const Timesheet = require('../timesheet');
const timesheetCollection = 'TimeSheets';

async function returnTimeSheets() {
    return db.find({}, timesheetCollection);
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