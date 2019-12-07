const db = require('../source/database');
const budgetCollection = 'Budgets';
const mongodb = require('mongodb');
const Budget = require('../source/budget');

describe('Budget.js Tests:', () => {

    // Connects to database before testing
    before(async () => {
        await db.myConnect();
    });

    // Closes database connection after testing
    after(async () => {
        await db.myClose();
    });

    describe('Budget Constructor Tests:', () => {

        it('Budget Constructor - Happy Path', async () => {

            const budgetObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            let budget = new Budget(budgetObject);

            if(!(budget._id.equals(budgetObject._id))) throw new Error('Budget Constructor Failure - budget._id');
            if(budget.jobNumber !== budgetObject.jobNumber) throw new Error('Budget Constructor Failure - budget.jobNumber');
            if(!(budget.jobID.equals(budgetObject.jobID))) throw new Error('Budget Constructor Failure - budget.jobID');
            if(budget.soldPrice !== budgetObject.soldPrice) throw new Error('Budget Constructor Failure - budget.soldPrice');
            if(budget.expectedHours !== budgetObject.expectedHours) throw new Error('Budget Constructor Failure - budget.expectedHours');
            if(budget.expectedDump !== budgetObject.expectedDump) throw new Error('Budget Constructor Failure - budget.expectedDump');
            if(budget.expectedExpenses !== budgetObject.expectedExpenses) throw new Error('Budget Constructor Failure - budget.expectedExpenses');       

        });

    });

    describe('Budget Save Tests:', () => {

        it('Budget Save - Happy Path', async () => {
            let budgetObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            let budget = new Budget(budgetObject);
            await budget.save();
           
            let foundBudget = await db.findOne({_id : budget._id}, budgetCollection);
            if(!(foundBudget._id.equals(budgetObject._id))) throw new Error('Budget Save Failed');
        });

    });

});