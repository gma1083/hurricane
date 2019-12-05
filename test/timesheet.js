const db = require('../source/database');
const Timesheet = require('../source/timesheet');
const collectionName = 'Timesheets';

describe('Timesheet.js Tests:', function() {
    
    // Connects to database before testing
    before(async function() {
        await db.myConnect();
    });

    // Closes database connection after testing
    after(async function() {
        await db.myClose();
    });

    describe('Timesheet Validation Tests:', function() {

        let timesheetValues = {
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

        it('Timesheet Validation - Happy Path', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.validate();

        });

        it('Timesheet Validation - _id', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet._id = 'Not Valid ID';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - _id');
            }
            catch(error){
                if(error.message !== '_id is not valid') throw new Error('timesheet ID validation failed');
            }
            

        });

        it('Timesheet Validation - date', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.date = 'Not Valid Date';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - date');
            }
            catch(error){
                if(error.message !== 'date is not valid') throw new Error('timesheet date validation failed');
            }

        });

        it('Timesheet Validation - employeeID', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.employeeID = 'Not Valid ID';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - employeeID');
            }
            catch(error){
                if(error.message !== 'employeeID is not valid') throw new Error('timesheet employeeID validation failed') ;
            }

        });

        it('Timesheet Validation - jobNumber', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.jobNumber = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - jobNumber');
            }
            catch(error){
                if(error.message !== 'jobNumber is not valid') throw new Error('timesheet jobNumber validation failed') ;
            }

        });

        it('Timesheet Validation - jobID', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.jobID = 'Not Valid ID';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - jobID');
            }
            catch(error){
                if(error.message !== 'jobID is not valid') throw new Error('timesheet jobID validation failed') ;
            }

        });

        it('Timesheet Validation - estCrewSize', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.estCrewSize = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - estCrewSize');
            }
            catch(error){
                if(error.message !== 'estCrewSize is not valid') throw new Error('timesheet estCrewSize validation failed') ;
            }

        });

        it('Timesheet Validation - estCrewHours', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.estCrewHours = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - estCrewHours');
            }
            catch(error){
                if(error.message !== 'estCrewHours is not valid') throw new Error('timesheet estCrewHours validation failed') ;
            }

        });

        it('Timesheet Validation - tmCrewSize', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.tmCrewSize = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - tmCrewSize');
            }
            catch(error){
                if(error.message !== 'tmCrewSize is not valid') throw new Error('timesheet tmCrewSize validation failed') ;
            }

        });

        it('Timesheet Validation - tmCrewHours', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.tmCrewHours = 'Not Valid Number';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - tmCrewHours');
            }
            catch(error){
                if(error.message !== 'tmCrewHours is not valid') throw new Error('timesheet tmCrewHours validation failed') ;
            }

        });

        it('Timesheet Validation - lunchTaken', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.lunchTaken = 'Not Valid Boolean';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - lunchTaken');
            }
            catch(error){
                if(error.message !== 'lunchTaken is not valid') throw new Error('timesheet lunchTaken validation failed') ;
            }

        });

        it('Timesheet Validation - jobFinished', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.jobFinished = 'Not Valid Boolean';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - jobFinished');
            }
            catch(error){
                if(error.message !== 'jobFinished is not valid') throw new Error('timesheet jobFinished validation failed') ;
            }

        });

        it('Timesheet Validation - offHauled', function() {

            let timesheet = new Timesheet(timesheetValues);
            timesheet.offHauled = 'Not Valid Boolean';
            try{
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - offHauled');
            }
            catch(error){
                if(error.message !== 'offHauled is not valid') throw new Error('timesheet offhauled validation failed') ;
            }

        });

        it('Timesheet Validation - yardsHauled', function() {
            let timesheet = new Timesheet(timesheetValues);
            timesheet.yardsHauled = 'Not Valid Number';
            try {
                timesheet.validate();
                throw new Error('Error expected but not thrown in Timesheet Validation - yardsHauled');
            }
            catch(error) {
                if (error.message !== 'yardsHauled is not valid') throw new Error('timesheet yardsHauled validation failed') ;
            }
        });

        it('Timesheet Validation - notes', function() {
            let timesheet = new Timesheet(timesheetValues);
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

});