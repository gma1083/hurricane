const db = require('./database.js');

class Person {
    constructor(firstName, lastName, birthDate){
        this._id = db.createMongoID();
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    save() {
        throw new Error('Cannot save a Person directly');
    }

    delete() {
        throw new Error('Cannot delete a Person directly');
    }

}

module.exports = Person;