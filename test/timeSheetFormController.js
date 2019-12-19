const db = require('../source/database');
const timeSheetFormController = require('../source/controllers/timeSheetFormController');
const Timesheet = require('../source/timesheet');

describe('TimeSheetFormController Tests:', () => {

        // Connects to database before testing
        before(async () => {
            await db.myConnect();
        });

        // Closes database connection after testing
        after(async () => {
            await db.myClose();
        });


    it('insertTime Test Foreman in DB', async () => {
        
        const timesheetData = {
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

        await timeSheetFormController.insertTime(timesheetData);
        const timesheet = await Timesheet.findById(timesheetData._id);
        if(timesheet === null) throw new Error('timesheetFormController insertTime failed');
    });

});