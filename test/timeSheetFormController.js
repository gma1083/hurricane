const database = require('../source/database');
const timeSheetFormController = require('../source/controllers/timeSheetFormController');

describe('TimeSheet Tests:', function(){

        // Connects to database before testing
        before(async function() {
            await database.myConnect();
        });

        // Closes database connection after testing
        after(async function(){
            await database.myClose();
        });



    it('insertTime Test Foreman in DB', async function(){
        let timeSheet = {
            date : new Date('2019-11-06'),
            foreman : 'Jose Ruiz'
        };
        let result = await timeSheetFormController.insertTime(timeSheet);
        if(result.result.ok !== 1) throw new Error('insert Time failed');
    });
    it('insertTime Test Foreman NOT in DB', async function(){
        let timeSheet = {
            name : 'Gregor', 
            date : new Date('2019-11-06'),
            hours : 8
        };
        try{
            let result = await timeSheetFormController.insertTime(timeSheet);
            return false;
        }
        catch(error){
            if(error.message !== 'Foreman Not Found') throw new Error('insertTime Test Foreman NOT in DB test failed: ' + error.message);
        }
        
    });

});