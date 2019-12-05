const db = require('./database');
const collectionName = 'Contacts';
const mongodb = require('mongodb');

class Contact {

    constructor(contact) {
        this._id = db.createMongoID();
        this.phoneNumber = contact.phoneNumber;
        this.email = contact.email;
        this.addressID = contact.addressID;
    }

    save() {
        return db.insertOne(this, collectionName);
    }

    delete() {
        return db.deleteOne({_id : this._id}, collectionName);
    }

    validate() {
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('Contact ID is not valid');
        if(typeof(this.phoneNumber) !== 'number') throw new Error('Contact phone number is not valid');
        if(typeof(this.email) !== 'string') throw new Error('Contact email is not valid');
        if(!(this.addressId instanceof mongodb.ObjectID)) throw new Error('Contact addressID is not valid');
    }

}

module.exports = Contact;