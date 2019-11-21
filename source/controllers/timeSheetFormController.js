const database = require('../database');
const collectionName = 'TimeSheets';

async function insertTime(timeSheet){
    let findResult = await database.find({name : timeSheet.foreman}, 'Foreman');
    if(findResult.length === 0) throw new Error('Foreman Not Found');
    
    return database.insertOne(timeSheet, collectionName);
}

module.exports = {
    insertTime,
}