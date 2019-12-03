const db = require('./database');
const collectionName = 'TimeSheets';

class Timesheet{

    constructor(timesheet){
        this._id = db.createMongoID();
        this.date = new Date();
        this.employeeID = timesheet.employeeID;
        this.jobID = timesheet.jobID ? timesheet.jobID : null;
        this.estCrewSize = timesheet.estCrewSize;
        this.estCrewHours = timesheet.estCrewHours;
        this.tmCrewSize = timesheet.tmCrewSize;
        this.tmCrewHours = timesheet.tmCrewHours;
        this.lunchTaken = timesheet.lunchTaken;
        this.jobFinished = timesheet.jobFinished;
        this.offHauled = timesheet.offHauled;
        this.yardsHauled = timesheet.yardsHauled;
        this.notes = timesheet.notes;
    }

    save() {
        return db.insertOne(this, collectionName);
    }

    delete() {
        return db.deleteOne({_id : this._id}, collectionName);
    }

    validate() {
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('timeSheetID is not valid');
        if(!(this.date instanceof Date)) throw new Error('Date is not valid');
        if(!(this.employeeID instanceof mongodb.ObjectID)) throw new Error('EmployeeID is not valid');
        // if(typeof(this.employee) !== 'string') throw new Error('Street Name is not valid');
        // if(typeof(this.city) !== 'string') throw new Error('City is not valid');
        // if(typeof(this.state) !== 'string') throw new Error('State is not valid');
        // if(typeof(this.zip) !== 'number') throw new Error('Zip is not valid');
        // if(typeof(this.county) !== 'string') throw new Error('Country is not valid');
    }

    
}

module.exports = Timesheet;