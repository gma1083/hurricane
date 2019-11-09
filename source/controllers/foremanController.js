const database = require('../database');
const collectionName = 'Foreman';


async function returnForeman(){
    return database.find({}, 'Foremans');
}

module.exports = {
    returnForeman,
}