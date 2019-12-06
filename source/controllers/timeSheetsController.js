const db = require('../database');
const Timesheet = require('../timesheet');
const collection = 'TimeSheets';
const mongodb = require('mongodb');

async function returnTimeSheets() {
    return db.find({}, collection);

}

async function deleteTimeSheet(timeSheetID) {
    console.log("Controller");
    console.log(timeSheetID);
    const result = await db.find({_id : new mongodb.ObjectID(timeSheetID)}, collection);
    console.log("After Find: " + result);
    const timesheet = new Timesheet(result);
    console.log(timesheet);
    await timesheet.delete();
}

module.exports = {
    returnTimeSheets,
    deleteTimeSheet,
};