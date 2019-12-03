const db = require('./database.js');
const Person = require('/person.js');
const collection = 'employee';

class Employee extends Person{

    constructor(firstName, lastName, birthDate, position, wage, employeeNumber, hireDate){
        super(firstName, lastName, birthDate);
        this.position = position;
        this.wage = wage;
        this.employeeNumber = employeeNumber;
        this.hireDate = hireDate;
    }


    save() {
        return db.insertOne(this, collection);
    }

    delete() {
        return db.deleteOne({_id : this._id}, collection);
    }
}

module.exports = Employee;