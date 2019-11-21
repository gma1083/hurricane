const db = require('/database.js');
const collection = 'People';

class Person{
    constructor(firstName, lastName, birthDate){
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthDate = birthDate;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(newFirstName) {
        this._firstName = newFirstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(newLastName) {
        this._lastName = newLastName;
    }

    get birthDate() {
        return this._birthDate;
    }

    set birthDate(newBirthDate) {
        this._birthDate = newBirthDate;
    }

    save() {
        
        return db.insertOne(this, collection);
    }

}

module.exports = Person;