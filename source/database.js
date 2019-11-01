const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
let client = null;

// Define db
let db = null;


// Use connect method to connect to the Server
// client.connect(function(err) {
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });

async function myConnect(){
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    return db;
}

async function myClose(){
    await client.close();
    db = null;
    client = null;
}

async function insertOne(document, collection){
    return db.collection(collection).insertOne(document);
}

async function insertMany(documents, collection){
    return db.collection(collection).insertMany(documents)
}

async function deleteOne(filter, collection){
    return db.collection(collection).deleteOne(filter);
}
async function deleteMany(filter, collection){
    return db.collection(collection).deleteMany(filter);
}

async function deleteDocument(document, collection){
    let docId = document._id;
    return deleteOne({_id : docId}, collection);
}

async function findOne(query, collection){
    return db.collection(collection).findOne(query);
}


module.exports = {
    myConnect,
    myClose,
    insertOne,
    deleteOne,
    deleteDocument,
    findOne,
    insertMany,
    deleteMany,
};