const database = require('../database');
const collection = 'TimeSheets';

async function returnTimeSheets() {
    return database.find({}, collection);
}

module.exports = {
    returnTimeSheets,
}