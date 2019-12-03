const db = require('./database');
const collectionName = 'Budgets';
const mongodb = require('mongodb');

class Budget{

    constructor(budget){
        this._id = db.createMongoID();
        this.jobNumber = budget.jobNumber;
        this.jobID = budget.jobID;
        this.soldPrice = budget.soldPrice;
        this.expectedHours = budget.expectedHours;
        this.expectedDump = budget.expectedDump;
        this.expectedExpenses = budget.expectedExpenses;
    }

    async save(){
        await this.validate();
        return db.insertOne(this, collectionName);
    }

    async delete(){
        await db.updateOne({_id : this.jobID}, { $set: { budgetID : null}}, 'Jobs');
        return db.deleteOne({_id : this._id}, collectionName);
    }

    static async delete(budgetID){
        let budget = await db.findOne({_id : budgetID}, collectionName);
        await db.updateOne({_id : budget.jobID}, { $set: { budgetID : null} }, 'Jobs');
        return db.deleteOne({_id : budgetID}, collectionName);
    }

    async validate(){
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('Budget ID is not valid');
        if(typeof(this.jobNumber) !== 'number') throw new Error('Job Number is not valid');
        if(!(this.jobID instanceof mongodb.ObjectID)) throw new Error('Budget jobID is not valid');
        if(typeof(this.soldPrice) !== 'number') throw new Error('Budget soldPrice is not valid');
        if(typeof(this.expectedHours) !== 'number') throw new Error('Budget expectedHours is not valid');
        if(typeof(this.expectedDump) !== 'number') throw new Error('Budget expectedDump is not valid');
        if(typeof(this.expectedHours) !== 'number') throw new Error('Budget expectedExpenses is not valid');

    }

}

module.exports = Budget;