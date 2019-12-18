const database = require('../database');
const Timesheet = require('../timesheet');
const collectionName = 'TimeSheets';
const mongodb = require('mongodb');

async function insertTime(timeSheet) {
    const findResult = await database.find({name : timeSheet.foreman}, 'Foremen');
    if(findResult.length === 0) throw new Error('Foreman Not Found');
    
    return database.insertOne(timeSheet, collectionName);
}

async function updateTimesheet(timeSheetData) {
    timeSheetData._id = new mongodb.ObjectID(timeSheetData._id);
    
    const timesheet = new Timesheet(timeSheetData);
    await timesheet.updateOne();
}

module.exports = {
    insertTime,
    updateTimesheet,
}