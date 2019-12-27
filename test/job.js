const db = require('../source/database');
const Job = require('../source/job');
const jobsCollection = 'Jobs';
const mongodb = require('mongodb');

describe('Job.js Tests:', () => {

    // Connects to database before testing
    before(async () => {
        await db.myConnect();
    });

    // Closes database connection after testing
    after(async () => {
        await db.myClose();
    });


    describe('Job Constructor Tests:', () => {
      
        it('Job Constructor - Happy Path', () => {
        
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);

            if(job._id !== jobObject._id) throw new Error('Job Constructor failure - jobID');
            if(job.jobNumber !== jobObject.jobNumber) throw new Error('Job Constructor failure - jobNumber');
            if(job.addressID !== jobObject.addressID) throw new Error('Job Constructor failure - addressID');
            if(job.clientID !== jobObject.clientID) throw new Error('Job Constructor failure - clientID');
            if(job.budgetID !== jobObject.budgetID) throw new Error('Job Constructor failure - budgetID');
         
        });    

    });

    describe('Job Validation Tests:', () => {

        it('Job Validation - Happy Path', async () => {
           
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            job.validate();

        });

        it('Job Validation - ID', async () => {
           
            const jobObject = {
                _id : "Not a Job ID",
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            try{
                job.validate();
            }
            catch(error){
                if(error.message !== 'JobID is not valid') throw new Error('jobID validation failed') ;
            }

        });

        it('Job Validation - jobNumber', async () => {
           
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : "Not a job number",
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            try{
                job.validate();
            }
            catch(error){
                if(error.message !== 'Job Number is not valid') throw new Error('jobNumber validation failed') ;
            }

        });

        it('Job Validation - addressID', async () => {
           
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : "123 Steiner Street",
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            try{
                job.validate();
            }
            catch(error){
                if(error.message !== 'Address is not valid') throw new Error('jobAddress validation failed') ;
            }

        });

        it('Job Validation - clientID', async () => {
           
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : "Client",
                budgetID : null        
            };

            const job = new Job(jobObject);
            try{
                job.validate();
            }
            catch(error){
                if(error.message !== 'Client is not valid') throw new Error('jobClient validation failed') ;
            }

        });

        it('Job Validation - budgetID', async () => {
           
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : 12345        
            };

            const job = new Job(jobObject);
            try{
                job.validate();
            }
            catch(error){
                if(error.message !== 'Budget is not valid') throw new Error('jobBudget validation failed') ;
            }

        });

    });

    describe('Job Save Tests:', () => {

        it('Job Save - Happy Path', async () => {
            
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const foundJob = await db.findOne({ _id : jobObject._id}, jobsCollection);
            if(!(foundJob._id.equals(jobObject._id))) throw new Error('Job save failed');
            await job.delete();
        });

        it('Job Save - Save Calls Validate', async () => {
            
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : "Try Me..",
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
        
            try{
                await job.save();
                throw new Error('Job save() should have thrown an error while validating and did not');
            }
            catch(error){
                if(error.message !== 'Job Number is not valid') throw new Error('Job Save does not call validate');
            }
            
            await job.delete();

        });

    });

    describe('Job Find Tests:', () => {

        it('Job.findOne() - Happy Path', async () => {
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const foundJob = await Job.findOne({_id : jobObject._id});
            if(!(foundJob._id.equals(jobObject._id))) throw new Error('Job.findOne() failed - happy path');
            await job.delete();
        });

        it('Job.findOne() - Job Job Doesnt Exist', async () => {
            const foundJob = await Job.findOne({_id : new mongodb.ObjectID()});
            if(foundJob !== null) throw new Error('Job.findOne() failed - Job found that shouldnt exist');
        });

        it('Job.findOne() - Returns Instance of Job', async () => {

            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const foundJob = await Job.findOne({_id : jobObject._id});
            if(!(foundJob instanceof Job)) throw new Error("Job.findOne() didnt return an instance of Job");
            await job.delete();

        });

        it('Job.findByNumbebr() - Happy Path', async () =>{

            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const foundJob = await Job.findByNumber(jobObject.jobNumber);
            if(foundJob === null) throw new Error('Job.findByNumber() Failed');
            await job.delete();

        });

        it('Job.findById() - Happy Path', async () => {

            const jobData = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobData);
            await job.save();

            const foundJob = await Job.findById(jobData._id);
            if(!(foundJob._id.equals(jobData._id))) throw new Error('Job.findById failed');
            await job.delete();

        });

        it('Job.findById() - Job Doesnt Exist', async () => {

            const foundJob = await Job.findById(db.createMongoID());
            if(foundJob !== null) throw new Error('Job.findById failed finding job that doesnt exist');

        });

        it('Job.findById() - Returns Instance of Job', async () => {

            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const foundJob = await Job.findById(job._id);
            if(!(foundJob instanceof Job)) throw new Error("Job.findOne() didnt return an instance of Job");
            await job.delete();

        });

        it('Job.findById() - Converts String IDs to ObjectIDs', async () => {

            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            const stringID = job._id.toHexString();

            const foundJob = await Job.findById(stringID);
            if(!(foundJob._id.equals(job._id))) throw new Error("Job.findOne() didnt return an instance of Job");
            await job.delete();

        });

        it('Job.findAll() - Happy Path', async () => {



        });

    });

    describe('Job Delete Tests:', () => {

        it('Job Delete - Happy Path (No Budget)', async () => {
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };

            const job = new Job(jobObject);
            await job.save();

            await job.delete();

            const findDeletedJob = await Job.findOne({_id : job._id});
            if(findDeletedJob !== null) throw new Error('Job Delete - Found job that should have been deleted');
        });

        it('Job Delete - Cant Find Job', async () => {
            const jobObject = {
                _id : db.createMongoID(),
                jobNumber : 12345,
                addressID : null,
                clientID : null,
                budgetID : null        
            };
        });

    });

});
    