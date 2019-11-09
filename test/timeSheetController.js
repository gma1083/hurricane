const database = require('../source/database');
const timeSheetController = require('../source/controllers/timeSheetController');

describe('TimeSheet Tests:', function(){

        // Connects to database before testing
        before(async function() {
            await database.myConnect();
        });

        // Closes database connection after testing
        after(async function(){
            await database.myClose();
        });



    it('insertTime Test', async function(){

        let timeSheet = {
            name : 'Gregor', 
            date : new Date('2019-11-06'),
            hours : 8
        };


        let result = await timeSheetController.insertTime(timeSheet);
        if(result.result.ok !== 1) throw new Error('insert Time failed');


        

    });
});