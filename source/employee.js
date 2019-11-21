const db = require('/database.js');
const Person = require('/person.js');
const collection = 'employee';

class Employee extends Person{

    constructor(firstName, lastName, birthDate, position, wage, hireDate){
        super(firstName, lastName, birthDate);
        this._position = position;
        this._wage = wage;
        this._hireDate = hireDate;
    }

    get position() {
        return this._position;
    }

    set position(newPosition) {
        this._position = newPosition;
    }

    get wage() {
        return this._wage;
    }

    set wage(newWage) {
        this._wage = newWage;
    }

    get hireDate() {
        return this._hireDate;
    }

    save() {
        super.save()
        return db.insertOne(this, collection);
    }

    delete() {
        return db.deleteOne({_firstName : this.firstName(), lastName : employee.lastName()}, collection);
    }
}

module.exports = Employee;