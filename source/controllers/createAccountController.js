const database = require('../database');
const collection = 'Accounts';


async function createAccount(newAccount) {
    let findResult = await database.find({email : newAccount.email}, 'Accounts');
    if(findResult.length !== 0 ) throw new Error('Account already exists');

    return database.insertOne(newAccount, collection);
}

async function returnAccounts() {
    return database.find({}, 'Accounts');
}

module.exports = {
    createAccount,
    returnAccounts,
}