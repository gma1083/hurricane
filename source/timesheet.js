const db = require('./database');
const timesheetCollection = 'TimeSheets';
const mongodb = require('mongodb');

class Timesheet {

    constructor(timesheet) {
        this._id = timesheet._id ? timesheet._id : db.createMongoID();
        this.date = timesheet.date ? timesheet.date : new Date();
        this.employeeID = timesheet.employeeID ? timesheet.employeeID : db.createMongoID();
        this.jobNumber = timesheet.jobNumber;
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
        this.constructorValidation();
    }

    constructorValidation() {

    }
    /**********************************************************
    //  Method name : save()
    //
    //  Parameters : None
    //
    //  Returns : Promise<insertOneWriteOpResultObject> - SEE https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~insertOneWriteOpResult 
    //
    //  Throws : error if validate() throws an error
    //           error if updateOne() throws an error
    //           error if insertOne() throws an error
    //
    **********************************************************/
    async save() {
        this.validate();
        //await db.updateOne({_id : this.jobID}, { $push: { timsheets : this._id} }, 'Jobs');
        return db.insertOne(this, timesheetCollection);
    }

    static async findById(timesheetID) {
        if(!(timesheetID instanceof mongodb.ObjectID)) timesheetID = new mongodb.ObjectID(timesheetID);
        const foundTimesheet = await db.findOne({_id : timesheetID}, timesheetCollection);
        const timesheet = new Timesheet(foundTimesheet);
        return timesheet;

    }

    async findOne() {

    }

    async delete() {
        await db.updateOne({_id : this.jobID}, { $pull: { timsheets : this._id} }, 'Jobs');
        return db.deleteOne({_id : this._id}, timesheetCollection);
    }

    async updateOne() {
        return db.updateOne({_id : this._id}, { $set : this}, timesheetCollection);
    }

    /**********************************************************
    //  Method name : validate()
    //
    //  Parameters : none
    //
    //  Returns : undefined
    //
    //  Throws : Unique error for each property that is set to an invalid type
    //
    **********************************************************/
    validate() {
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('_id is not valid');
        if(!(this.date instanceof Date)) throw new Error('date is not valid');
        if(!(this.employeeID instanceof mongodb.ObjectID)) throw new Error('employeeID is not valid');
        if(typeof(this.jobNumber) !== 'number') throw new Error('jobNumber is not valid');
        if(!(this.jobID instanceof mongodb.ObjectID)) throw new Error('jobID is not valid');
        if(typeof(this.estCrewSize) !== 'number') throw new Error('estCrewSize is not valid');
        if(typeof(this.estCrewHours) !== 'number') throw new Error('estCrewHours is not valid');
        if(typeof(this.tmCrewSize) !== 'number') throw new Error('tmCrewSize is not valid');
        if(typeof(this.tmCrewHours) !== 'number') throw new Error('tmCrewHours is not valid');
        if(typeof(this.lunchTaken) !== 'boolean') throw new Error('lunchTaken is not valid');
        if(typeof(this.jobFinished) !== 'boolean') throw new Error('jobFinished is not valid');
        if(typeof(this.offHauled) !== 'boolean') throw new Error('offHauled is not valid');
        if(typeof(this.yardsHauled) !== 'number') throw new Error('yardsHauled is not valid');
        if(typeof(this.notes) !== 'string') throw new Error('notes is not valid');
    }

    
}

module.exports = Timesheet;