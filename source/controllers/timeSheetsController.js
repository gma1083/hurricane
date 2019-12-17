const db = require('../database');
const Timesheet = require('../timesheet');
const collection = 'TimeSheets';
const mongodb = require('mongodb');

async function returnTimeSheets() {
    return db.find({}, collection);

}

async function deleteTimeSheet(timeSheetID) {
    const result = await db.findOne({_id : new mongodb.ObjectID(timeSheetID)}, collection);
    const timesheet = new Timesheet(result);
    await timesheet.delete();
}

module.exports = {
    returnTimeSheets,
    deleteTimeSheet,
};