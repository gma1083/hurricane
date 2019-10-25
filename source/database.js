const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Define db
let db = null;


// Use connect method to connect to the Server
// client.connect(function(err) {
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });

async function myConnect(){
    await client.connect();
    db = client.db(dbName);
    return db;
}

async function myClose(){
    await client.close();
    db = null;
}

async function insertOne(document, collection){
    return db.collection(collection).insertOne(document);
}


module.exports = {
    myConnect,
    myClose,
    insertOne,
};