const db = require('../source/database');
const budgetCollection = 'Budgets';
const mongodb = require('mongodb');

class Budget {

    constructor(budget) {
        this._id = budget._id ? budget._id : db.createMongoID();
        this.jobNumber = budget.jobNumber;
        this.jobID = budget.jobID ? budget.jobID : db.createMongoID();
        this.soldPrice = budget.soldPrice;
        this.expectedHours = budget.expectedHours;
        this.expectedDump = budget.expectedDump;
        this.expectedExpenses = budget.expectedExpenses;
    }

    async save() {
        this.validate();
        await db.updateOne({_id : this.jobID}, { $set: { "budgetID" : this._id} }, 'Jobs');
        return db.insertOne(this, budgetCollection);
    }

    static async findOne(query) {
        return db.findOne(query, budgetCollection);
    }

    static async findById(budgetID) {
        return db.findOne({_id : budgetID}, budgetCollection);
    }

    async updateOne(update) {
        return db.updateOne({_id : this._id}, update, budgetCollection);
    }

    async delete() {
        await db.updateOne({_id : this.jobID}, { $set: { budgetID : null}}, 'Jobs');
        return db.deleteOne({_id : this._id}, budgetCollection);
    }

    static async delete(budgetID) {
        const budget = await db.findOne({_id : budgetID}, budgetCollection);
        if(budget.jobID !== null) await db.updateOne({_id : budget.jobID}, { $set: { budgetID : null} }, 'Jobs');
        return db.deleteOne({_id : budgetID}, 'Budgets');
    }

    validate() {
        if(!(this._id instanceof mongodb.ObjectID)) throw new Error('Budget ID is not valid');
        if(typeof(this.jobNumber) !== 'number') throw new Error('Budget jobNumber is not valid');
        if(!(this.jobID instanceof mongodb.ObjectID)) throw new Error('Budget jobID is not valid');
        if(typeof(this.soldPrice) !== 'number') throw new Error('Budget soldPrice is not valid');
        if(typeof(this.expectedHours) !== 'number') throw new Error('Budget expectedHours is not valid');
        if(typeof(this.expectedDump) !== 'number') throw new Error('Budget expectedDump is not valid');
        if(typeof(this.expectedHours) !== 'number') throw new Error('Budget expectedExpenses is not valid');
    }

}

module.exports = Budget;