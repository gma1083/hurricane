const database = require('../database');
const collectionName = 'Foremen';


async function returnForemen() {
    return database.find({}, 'Foremen');
}

module.exports = {
    returnForemen,
}