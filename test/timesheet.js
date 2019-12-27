const db = require('../source/database');
const Timesheet = require('../source/timesheet');
const collectionName = 'TimeSheets';
const mongodb = require('mongodb');

describe('Timesheet.js Tests:', () => {
    
    // Connects to database before testing
    before(async () => {
        await db.myConnect();
    });

    // Closes database connection after testing
    after(async () => {
        await db.myClose();
    });

    describe('Timesheet Constructor Tests: ', () => {

        it('Timesheet Constructor - Happy Path', async () => {

            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };

            const timesheet = new Timesheet(timesheetValues);

            if(timesheet._id !== timesheetValues._id) throw new Error('Timesheet Constructor Failure - timesheet._id');
            if(timesheet.date !== timesheetValues.date) throw new Error('Timesheet Constructor Failure - timesheet.date');
            if(timesheet.employeeID !== timesheetValues.employeeID) throw new Error('Timesheet Constructor Failure - timesheet.employeeID');
            if(timesheet.jobNumber !== timesheetValues.jobNumber) throw new Error('Timesheet Constructor Failure - timesheet.jobNumber');
            if(timesheet.jobID !== timesheetValues.jobID) throw new Error('Timesheet Constructor Failure - timesheet.jobID');
            if(timesheet.estCrewSize !== timesheetValues.estCrewSize) throw new Error('Timesheet Constructor Failure - timesheet.estCrewSize');
            if(timesheet.estCrewHours !== timesheetValues.estCrewHours) throw new Error('Timesheet Constructor Failure - timesheet.estCrewHours');
            if(timesheet.tmCrewSize !== timesheetValues.tmCrewSize) throw new Error('Timesheet Constructor Failure - timesheet.tmCrewSize');
            if(timesheet.tmCrewHours !== timesheetValues.tmCrewHours) throw new Error('Timesheet Constructor Failure - timesheet.tmCrewHours');
            if(timesheet.lunchTaken !== timesheetValues.lunchTaken) throw new Error('Timesheet Constructor Failure - timesheet.lunchTaken');
            if(timesheet.jobFinished !== timesheetValues.jobFinished) throw new Error('Timesheet Constructor Failure - timesheet.jobFinished');
            if(timesheet.offHauled !== timesheetValues.offHauled) throw new Error('Timesheet Constructor Failure - timesheet.offHauled');
            if(timesheet.yardsHauled !== timesheetValues.yardsHauled) throw new Error('Timesheet Constructor Failure - timesheet.yardsHauled');
            if(timesheet.notes !== timesheetValues.notes) throw new Error('Timesheet Constructor Failure - timesheet.notes');

        });

    });

    describe('Timesheet Save Tests:', () => {

        it('Timesheet Save - Happy Path', async () => {
            
            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };
            const timesheet = new Timesheet(timesheetValues);
            await timesheet.save();

            const foundTimesheet = await db.findOne({ _id : timesheet._id}, collectionName);
            if(!(foundTimesheet._id.equals(timesheetValues._id))) throw new Error('Timesheet save failed');
            await timesheet.delete();
        });

    });


    describe('Timesheet Delete Tests:', () => {

        it('Timesheet Delete - Happy Path', async () => {

            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };

            const timesheet = new Timesheet(timesheetValues);

            await timesheet.save();

            const deletedPromise = await timesheet.delete();
            if(!(deletedPromise.result.ok === 1 && deletedPromise.result.n === 1)) throw new Error('Timesheet Delete - timesheet.delete() failed');

            await timesheet.delete();



        });

    });

    describe('Timesheet Update Tests:', () => {

        it('timesheet.updateOne() - Happy Path', async () => {
            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };
            const timesheet = new Timesheet(timesheetValues);
            await timesheet.save();
            timesheet.yardsHauled = 20;

            await timesheet.updateOne();
            const newTimesheet = await db.findOne({_id : timesheet._id}, collectionName);
            if(newTimesheet.yardsHauled === timesheetValues.yardsHauled) throw new Error('timesheet.updateOne() failed');

            await timesheet.delete();
        });

    });

    describe('Timesheet Validation Tests:', () => {

        const timesheetValues = {
            _id : db.createMongoID(),
            date : new Date(),
            employeeID : db.createMongoID(),
            jobNumber : 12345,
            jobID : db.createMongoID(),
            estCrewSize : 3,
            estCrewHours : 8,
            tmCrewSize : 0,
            tmCrewHours : 0,
            lunchTaken : true,
            jobFinished : true,
            offHauled : false,
            yardsHauled : 0,
            notes : 'Test Notes'
        };

        it('Timesheet Validation - Happy Path', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.validate();

        });

        it('Timesheet Validation - _id', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet._id = 'Not Valid ID';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - _id');
            }
            catch(error){
                if(error.message !== '_id is not valid') throw new Error('timesheet ID validation failed');
            }
            

        });

        it('Timesheet Validation - date', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.date = 'Not Valid Date';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - date');
            }
            catch(error){
                if(error.message !== 'date is not valid') throw new Error('timesheet date validation failed');
            }

        });

        it('Timesheet Validation - employeeID', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.employeeID = 'Not Valid ID';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - employeeID');
            }
            catch(error){
                if(error.message !== 'employeeID is not valid') throw new Error('timesheet employeeID validation failed') ;
            }

        });

        it('Timesheet Validation - jobNumber', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.jobNumber = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - jobNumber');
            }
            catch(error){
                if(error.message !== 'jobNumber is not valid') throw new Error('timesheet jobNumber validation failed') ;
            }

        });

        it('Timesheet Validation - jobID', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.jobID = 'Not Valid ID';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - jobID');
            }
            catch(error){
                if(error.message !== 'jobID is not valid') throw new Error('timesheet jobID validation failed') ;
            }

        });

        it('Timesheet Validation - estCrewSize', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.estCrewSize = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - estCrewSize');
            }
            catch(error){
                if(error.message !== 'estCrewSize is not valid') throw new Error('timesheet estCrewSize validation failed') ;
            }

        });

        it('Timesheet Validation - estCrewHours', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.estCrewHours = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - estCrewHours');
            }
            catch(error){
                if(error.message !== 'estCrewHours is not valid') throw new Error('timesheet estCrewHours validation failed') ;
            }

        });

        it('Timesheet Validation - tmCrewSize', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.tmCrewSize = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - tmCrewSize');
            }
            catch(error){
                if(error.message !== 'tmCrewSize is not valid') throw new Error('timesheet tmCrewSize validation failed') ;
            }

        });

        it('Timesheet Validation - tmCrewHours', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.tmCrewHours = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - tmCrewHours');
            }
            catch(error){
                if(error.message !== 'tmCrewHours is not valid') throw new Error('timesheet tmCrewHours validation failed') ;
            }

        });

        it('Timesheet Validation - lunchTaken', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.lunchTaken = 'Not Valid Boolean';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - lunchTaken');
            }
            catch(error){
                if(error.message !== 'lunchTaken is not valid') throw new Error('timesheet lunchTaken validation failed') ;
            }

        });

        it('Timesheet Validation - jobFinished', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.jobFinished = 'Not Valid Boolean';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - jobFinished');
            }
            catch(error){
                if(error.message !== 'jobFinished is not valid') throw new Error('timesheet jobFinished validation failed') ;
            }

        });

        it('Timesheet Validation - offHauled', () => {

            const timesheet = new Timesheet(timesheetValues);
            timesheet.offHauled = 'Not Valid Boolean';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - offHauled');
            }
            catch(error){
                if(error.message !== 'offHauled is not valid') throw new Error('timesheet offhauled validation failed') ;
            }

        });

        it('Timesheet Validation - yardsHauled', () => {
            const timesheet = new Timesheet(timesheetValues);
            timesheet.yardsHauled = 'Not Valid Number';
            try {
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - yardsHauled');
            }
            catch(error) {
                if (error.message !== 'yardsHauled is not valid') throw new Error('timesheet yardsHauled validation failed') ;
            }
        });

        it('Timesheet Validation - notes', () => {
            const timesheet = new Timesheet(timesheetValues);
            timesheet.notes =  true;
            try {
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - notes');
            }
            catch(error) {
                if (error.message !== 'notes is not valid') throw new Error('timesheet notes validation failed') ;
            }
        });

    });

    describe('Timesheets Find Tests:', () => {
        
        it('Timesheet.findById() Test - Happy Path', async () => {
            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };
            const timesheet = new Timesheet(timesheetValues);
            await timesheet.save();
    
            const foundTimesheet = await Timesheet.findById(timesheet._id);
            if(!(foundTimesheet._id.equals(timesheet._id))) throw new Error('Timesheet.findById() failed');

            await timesheet.delete();
        });

        it('Timesheet.findById() Test - Find Returns Instance of Timesheet', async () => {
            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };
            const timesheet = new Timesheet(timesheetValues);
            await timesheet.save();
    
            const foundTimesheet = await Timesheet.findById(timesheet._id);
            if(!(foundTimesheet instanceof Timesheet)) throw new Error('Timesheet.findById() return is not Instance of Timesheet');

            await timesheet.delete();
        });

        it('Timesheet.findById() Test - Accepts & converts string for timesheet._id', async () => {
            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };
            const timesheet = new Timesheet(timesheetValues);
            await timesheet.save();

            const stringID = timesheet._id.toHexString();
            if(stringID instanceof mongodb.ObjectID) throw new Error('timesheet._id conversion to hexString failed');

            const foundTimesheet = await Timesheet.findById(stringID);
            if(!(foundTimesheet._id.equals(timesheet._id))) throw new Error('Timesheet.findById() id string conversion failed');

            await timesheet.delete();
        });

        it('Timesheet.findById() Test - Giving an ID that cant be converted into an ObjectID', async () => {
            const foundTimesheet = await Timesheet.findById("Hello");
            if(foundTimesheet !== null) throw new Error('Timesheet.findById() failed given a bad string ID');
        });

        it('Timesheet.findOne() Test - Happy Path', async () => {
            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };
            const timesheet = new Timesheet(timesheetValues);
            await timesheet.save();
    
            const foundTimesheet = await Timesheet.findOne({_id : timesheet._id});
            if(!(foundTimesheet._id.equals(timesheet._id))) throw new Error('Timesheet.findById() failed');

            await timesheet.delete();
        });

        it('Timesheet.findOne() Test - Returns Instance of Timesheet', async () => {
            const timesheetValues = {
                _id : db.createMongoID(),
                date : new Date(),
                employeeID : db.createMongoID(),
                jobNumber : 12345,
                jobID : db.createMongoID(),
                estCrewSize : 3,
                estCrewHours : 8,
                tmCrewSize : 0,
                tmCrewHours : 0,
                lunchTaken : true,
                jobFinished : true,
                offHauled : false,
                yardsHauled : 0,
                notes : 'Test Notes'
            };
            const timesheet = new Timesheet(timesheetValues);
            await timesheet.save();
    
            const foundTimesheet = await Timesheet.findOne({_id : timesheet._id});
            if(!(foundTimesheet instanceof Timesheet)) throw new Error('Timesheet.findOne() return is not Instance of Timesheet');

            await timesheet.delete();
        });

        it('Timesheet.findOne() Test - Returns null if timesheet not found', async () => {
            const foundTimesheet = await Timesheet.findOne({_id : db.createMongoID()});
            if(foundTimesheet !== null) throw new Error('Timesheet.findOne() should return null if no timesheet is found');
        });   

    });

});