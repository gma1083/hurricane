const db = require('./database.js');

class Person {
    constructor(personData) {
        this._id = personData._id ? personData._id : db.createMongoID();
        this.firstName = personData.firstName;
        this.lastName = personData.lastName;
        this.birthDate = personData.birthDate;
    }

    save() {
        throw new Error('Cannot save a Person directly');
    }

    delete() {
        throw new Error('Cannot delete a Person directly');
    }

}

module.exports = Person;