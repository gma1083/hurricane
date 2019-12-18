const db = require('./database');
const jobsCollection = 'Jobs';
const mongodb = require('mongodb');
const Budget = require('./budget');

class Job {

    constructor(job) {
        this._id = job._id ? job._id : db.createMongoID();
        this.jobNumber = job.jobNumber;
        this.addressID = job.address ? job.address : null;
        this.clientID = job.client ? job.client : null;
        this.timeSheets = [];
        this.expenses = [];
        this.budgetID = job.budgetID ? job.budgetID : null;
        this.incomes = [];
    }

    async save() {
        this.validate();
        return db.insertOne(this, jobsCollection);
    }

    validate() {
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('JobID is not valid');
        if(typeof(this.jobNumber) !== 'number') throw new Error('Job Number is not valid');
        if(!(this.addressID instanceof mongodb.ObjectID) && (this.addressID !== null)) throw new Error('Address is not valid');
        if(!(this.clientID instanceof mongodb.ObjectID) && (this.clientID !== null)) throw new Error('Client is not valid');
        if(!(this.budgetID instanceof mongodb.ObjectID) && (this.budgetID !== null)) throw new Error('Budget is not valid');
    }

    async delete() {

        let deleteResults = [];

        //Delete the budget (if any) associated with this job
        let deleteBudgetResult = await this.deleteBudget();
        deleteResults.push(deleteBudgetResult);

        //Sets JobID field to null for all timesheets (if any) associated with this job
        let unlinkTimesheetsResult = await this.unlinkTimesheets();
        deleteResults.push(unlinkTimesheetsResult);

        //Sets JobID field to null for all expenses (if any) associated with this job
        let unlinkExpensesResult = await this.unlinkExpenses();
        deleteResults.push(unlinkExpensesResult);

        //Sets JobID field to null for all incomes (if any) associated with this job
        let unlinkIncomesResult = await this.unlinkIncomes();
        deleteResults.push(unlinkIncomesResult);

        //Deletes Job after unlinking all related objects in other collections
        let deleteJobResult = await db.deleteOne({_id : this._id}, jobsCollection);
        deleteResults.push(deleteJobResult);

        return deleteResults;
    }

    static async findOne(query) {
        const jobData = await db.findOne(query, jobsCollection);
        if(jobData !== null) {
            const job = new Timesheet(jobData);
            return job;
        }
        return jobData;
    }

    static async findById(jobID) {
        if(!(jobID instanceof mongodb.ObjectID)) {
            try{
                jobID = new mongodb.ObjectID(jobID);
            }
            catch(error){
                console.log(error);
                return null;
            }
        }
        const jobData = await db.findOne({_id : jobID}, jobsCollection);
        if(jobData !== null) {
            const job = new Timesheet(jobData);
            return job;
        }
        return jobData;
    }

    async deleteBudget() {
        if(this.budgetID !== null) {
            let budget = await Budget.findOne({_id : this.budgetID});
            let deleteBudgetPromise = await budget.delete();
            return deleteBudgetPromise;
        }
        return null;
    }

    async unlinkTimesheets() {
        if(this.timeSheets.length !== 0) {
            let unlinkTimesheetsResult = db.updateMany({_id : {$in : this.timesheets}}, { $set: { jobId : null} }, 'Timesheets');
            return unlinkTimesheetsResult;
        }
        return null;
    }

    async unlinkExpenses() {
        if(this.expenses !== null) {
            let unlinkExpensesResult = db.updateMany({_id : {$in : this.expenses}}, { $set: { jobId : null} }, 'Expenses');
            return unlinkExpensesResult;
        }
        return null;
    }

    async unlinkIncomes() {
        if(this.incomes !== null) {
            let unlinkIncomesResult = db.updateMany({_id : {$in : this.incomes}}, { $set: { jobId : null} }, 'Incomes');
            return unlinkIncomesResult;
        }
        return null;
    }

}

module.exports = Job;