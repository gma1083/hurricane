const db = require('../source/database');
const Employee = require('../source/employee');
//const Person = require('../source/person');
const employeeCollection = 'Employees';
const mongodb = require('mongodb');

describe('Employee.js Tests:', () => {

       // Connects to database before testing
    before(async () => {
        await db.myConnect();
    });

    // Closes database connection after testing
    after(async () => {
        await db.myClose();
    });

    describe('Employee Constructor Tests', () => {

        it('Employee Constructor - Happy Path', () => {

            const employeeData = {
                _id : db.createMongoID(),
                firstName : "Jose",
                lastName : "Ruiz",
                birthDate : new Date(),
                position : "Foreman",
                wage : 32,
                employeeNumber : 5,
                hireDate : new Date()
            };

            const employee = new Employee(employeeData);

            if(employee._id !== employeeData._id) throw new Error('Employee Constructor Failure - employee._id');
            if(employee.firstName !== employeeData.firstName) throw new Error('Employee Constructor Failure - employee.firstName');
            if(employee.lastName !== employeeData.lastName) throw new Error('Employee Constructor Failure - employee.lastName');
            if(employee.birthDate !== employeeData.birthDate) throw new Error('Employee Constructor Failure - employee.birthdDate');
            if(employee.position !== employeeData.position) throw new Error('Employee Constructor Failure - employee.position');
            if(employee.wage !== employeeData.wage) throw new Error('Employee Constructor Failure - employee.wage');
            if(employee.employeeNumber !== employeeData.employeeNumber) throw new Error('Employee Constructor Failure - employee.employeeNumber');
            if(employee.hireDate !== employeeData.hireDate) throw new Error('Employee Constructor Failure - employee.hireDate');

        });

    });

    describe('Employee Save Tests:', () => {

        it('employee.save() - Happy Path', async () => {

            const employeeData = {
                _id : db.createMongoID(),
                firstName : "Jose",
                lastName : "Ruiz",
                birthDate : new Date(),
                position : "Foreman",
                wage : 32,
                employeeNumber : 5,
                hireDate : new Date()
            };

            const employee = new Employee(employeeData);
            await employee.save();

            const foundEmployee = await db.findOne({ _id : employee._id}, employeeCollection);
            if(!(foundEmployee._id.equals(employee._id))) throw new Error('employee.save() failed');
            await employee.delete();

        });

    });


    describe('Employee Find Tests', () => {

        it('Employee.findById() - Happy Path', async () => {

            const employeeData = {
                _id : db.createMongoID(),
                firstName : "Jose",
                lastName : "Ruiz",
                birthDate : new Date(),
                position : "Foreman",
                wage : 32,
                employeeNumber : 5,
                hireDate : new Date()
            };

            const employee = new Employee(employeeData);
            await employee.save();

            const foundEmployee = await Employee.findById(employeeData._id);
            if(!(foundEmployee._id.equals(employee._id))) throw new Error('Employee.findById() failed');
            await employee.delete();

        });

        it('Employee.findByName() - Happy Path', async () => {

            const employeeData = {
                _id : db.createMongoID(),
                firstName : "Mike",
                lastName : "Mecham",
                birthDate : new Date(),
                position : "Foreman",
                wage : 32,
                employeeNumber : 5,
                hireDate : new Date()
            };

            const employee = new Employee(employeeData);
            await employee.save();

            const employeeName = employeeData.firstName + " " + employeeData.lastName;
            const foundEmployee = await Employee.findByName(employeeName);
            if(foundEmployee.firstName !== employee.firstName && foundEmployee.lastName !== employee.lastName) throw new Error('Employee.findByName() failed');
            await employee.delete();

        });

    });

    describe('Employee Conversion Tests:', () => {

        it('Employee.nameToId() - Returns ID From Name In DB', async () => {

            const employeeData = {
                _id : db.createMongoID(),
                firstName : "Thork",
                lastName : "Mortan",
                birthDate : new Date(),
                position : "Foreman",
                wage : 100,
                employeeNumber : 50,
                hireDate : new Date()
            };

            const employee = new Employee(employeeData);
            await employee.save();
            const employeeName = employeeData.firstName + " " + employeeData.lastName;

            const employeeID = await Employee.nameToId(employeeName);

            if(!(employeeID.equals(employee._id))) throw new Error('Employee.nameToId() should have returned ID');
            await employee.delete();

        });

        it('Employee.nameToId() - Returns Null When Employee Not In DB', async () => {

            const employeeID = await Employee.nameToId("Mickey Mouse");
            if(employeeID !== null) throw new Error('Employee.nameToId() should have returned null');

        });

    });

});