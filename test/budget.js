const db = require('../source/database');
const budgetCollection = 'Budgets';
const mongodb = require('mongodb');
const Budget = require('../source/budget');
const Job = require('../source/job');

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

            const budget = new Budget(budgetObject);

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
            const budgetObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            const budget = new Budget(budgetObject);
            await budget.save();
           
            const foundBudget = await db.findOne({_id : budget._id}, budgetCollection);
            if(!(foundBudget._id.equals(budgetObject._id))) throw new Error('Budget Save Failed');
        });

        it('Budget Save - Save Calls Validate()', async () => {

            const budgetObject = {
                _id : db.createMongoID(),
                jobNumber : "Not a Valid Job Number",
                jobID : db.createMongoID(),
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            const budget = new Budget(budgetObject);
            try{
                await budget.save();
                throw new Error('Budget save() should have thrown an error while validating and did not');
            }
            catch(error){
                if(error.message !== 'Budget jobNumber is not valid') throw new Error('Budget Save does not call validate');
            }
            
        });

        it('Budget Save - Save updates Job', async () => {

            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const budgetObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                jobID : job._id,
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            const budget = new Budget(budgetObject);
            await budget.save();

            const modifiedJob = await db.findOne({_id : job._id}, 'Jobs');
            if(!(budget._id.equals(modifiedJob.budgetID))) throw new Error('Budget Save doesnt modify job.budgetID');

        });

    });

    describe('Budget Delete Tests:', () => {

        it('Budget Delete - Happy Path', async () => {

            const budgetObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                jobID : null,
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            const budget = new Budget(budgetObject);
            await budget.save();

            await budget.delete();

            const findDeletedBudget = await Budget.findOne({_id : budget._id});
            if(findDeletedBudget !== null) throw new Error('Budget Delete - Found budget that should have been deleted');

        });

        it('Budget Delete - Unlinks Budget From Job', async () => {

            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const budgetObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                jobID : job._id,
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            const budget = new Budget(budgetObject);
            await budget.save();
            await budget.delete();

            const foundJob = await Job.findOne({_id : job._id});
            if(foundJob.budgetID !== null) throw new Error('Budget delete() does not remove itself from its Job');
        });

        it('Budget Delete - Static Delete', async () => {

            const budgetObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                jobID : null,
                soldPrice : 1000,
                expectedHours : 10,
                expectedDump : 100,
                expectedExpenses : 250
            };

            const budget = new Budget(budgetObject);
            await budget.save();

            await Budget.delete(budget._id);

            const findDeletedBudget = await Budget.findOne({_id : budget._id});
            if(findDeletedBudget !== null) throw new Error('Budget Delete - Static delete method did not delete job');

        });

    });

});