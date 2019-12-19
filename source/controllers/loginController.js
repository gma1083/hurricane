const database = require('../database');
const collection = 'Accounts';


async function login(account) {
    
    const findAccount = await database.find({email : account.email}, collection);
    if(findAccount.length === 0 ) throw new Error('Account does not exist!');
    if(findAccount[0].password !== account.password) throw new Error('Password is not correct!');

}

module.exports = {
    login,
};