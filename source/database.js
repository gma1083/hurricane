const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
let client = null;

// Define db
let db = null;

async function myConnect() {
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    return db;
}

async function myClose() {
    await client.close();
    let dbClosed = [];
    db = null;
    client = null;
    dbClosed.push(db, client);
    return dbClosed;
}

// Database method to create a new MongoDB ObjectID 
function createMongoID() {
    return new mongodb.ObjectID();
}

// Database method to insert a single document into a specified collection 
async function insertOne(document, collection) {
    return db.collection(collection).insertOne(document);
}

// Database method to insert multiple document into a specified collection 
async function insertMany(documents, collection) {
    return db.collection(collection).insertMany(documents);
}

// Database method to delete a single document from a specified collection
async function deleteOne(filter, collection) {
    return db.collection(collection).deleteOne(filter);
}

// Database method to delete multiple document from a specified collection
async function deleteMany(filter, collection) {
    return db.collection(collection).deleteMany(filter);
}

// Database method to delete a specific document into a specified collection
async function deleteDocument(document, collection) {
    const docId = document._id;
    return deleteOne({_id : docId}, collection);
}

async function findOne(query, collection) {
    return db.collection(collection).findOne(query);
}

async function find(query, collection) {
    return db.collection(collection).find(query).toArray();
}

async function updateOne(query, update, collection) {
    return db.collection(collection).updateOne(query, update);
}

async function updateMany(query, update, collection) {
    return db.collection(collection).updateMany(query, update);
}

module.exports = {
    createMongoID,
    myConnect,
    myClose,
    insertOne,
    deleteOne,
    deleteDocument,
    findOne,
    insertMany,
    deleteMany,
    find,
    updateOne,
    updateMany,
};