const db = require('./database');
const collectionName = 'Addresses';
const mongodb = require('mongodb');

class Address{

    constructor(streetNumber, streetName, city, state, zip, country){
        this._id = db.createMongoID(); 
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    }

    async save() {
        await this.validate();
        return db.insertOne(this, collectionName);
    }

   async  delete() {
        return db.deleteOne({_id : this._id}, collectionName);
    }

    async validate() {
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('adressID is not valid');
        if(typeof(this.streetNumber) !== 'number') throw new Error('Street Number is not valid');
        if(typeof(this.streetName) !== 'string') throw new Error('Street Name is not valid');
        if(typeof(this.city) !== 'string') throw new Error('City is not valid');
        if(typeof(this.state) !== 'string') throw new Error('State is not valid');
        if(typeof(this.zip) !== 'number') throw new Error('Zip is not valid');
        if(typeof(this.county) !== 'string') throw new Error('Country is not valid');
        
    }

    
}

module.exports = Address;