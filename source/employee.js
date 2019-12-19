const db = require('./database.js');
const Person = require('./person.js');
const employeeCollection = 'Employees';
const mongodb = require('mongodb');

class Employee extends Person {

    constructor(employeeData){
        super(employeeData);
        this.position = employeeData.position;
        this.wage = employeeData.wage;
        this.employeeNumber = employeeData.employeeNumber;
        this.hireDate = employeeData.hireDate;
    }


    async save() {
        this.validate();
        return db.insertOne(this, employeeCollection);
    }

    async delete() {
        return db.deleteOne({_id : this._id}, employeeCollection);
    }

    validate() {
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('Employee _id Is Not Valid');
        if((typeof this.firstName !== 'string')) throw new Error('Employee First Name Is Not Valid');
        if(typeof(this.lastName) !== 'string') throw new Error('Employee Last Name Is Not Valid');
        if(!(this.birthDate instanceof Date)) throw new Error('Employee Date Is Not Valid');
        if(typeof(this.position) !== 'string') throw new Error('Employee Position Is Not Valid');
        if(typeof(this.wage) !== 'number') throw new Error('Employee Wage Is Not Valid');
        if(typeof(this.employeeNumber) !== 'number') throw new Error('Employee employeeNumber Is Not Valid');
        if(!(this.hireDate instanceof Date)) throw new Error('Employee hiredDate Is Not Valid');
    }

    static async findById(employeeID) {
        if(!(employeeID instanceof mongodb.ObjectID)) {
            try{
                employeeID = new mongodb.ObjectID(employeeID);
            }
            catch(error){
                return null;
            }
        }
        const employeeData = await db.findOne({_id : employeeID}, employeeCollection);
        if(employeeData !== null) {
            const employee = new Employee(employeeData);
            return employee;
        }
        return employeeData;
    }

    static async findByName(name) {
        const regNameMatch = name.match(/[A-Za-z]+/g);
        const firstNameReg = regNameMatch[0];
        const lastNameReg = regNameMatch[1];
        const employeeData = await db.findOne({ $and: [{firstName: firstNameReg }, {lastName: lastNameReg }]}, employeeCollection);
        if(employeeData !== null) {
            const employee = new Employee(employeeData);
            return employee;
        }
        return employeeData;
    }

    static async findOne(query) {
        const employeeData = await db.findOne(query, employeeCollection);
        if(employeeData !== null) {
            const employee = new Employee(employeeData);
            return employee;
        }
        return employeeData;
    }

    async updateOne() {
        return db.updateOne({_id : this._id}, { $set : this}, employeeCollection);
    }

    
}

module.exports = Employee;