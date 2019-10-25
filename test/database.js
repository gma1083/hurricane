
const database = require('../source/database');

describe('Jobs Testing', function() {

    describe.skip('Opening and Closing Tests:', function(){
     
        it('Testing myConnect', async function(){
            let db = await database.myConnect();
            if(db === null) {
                throw new Error('First Error');
            }
            else{
                return true;
            }
        });

        it('Testing myClose', async function(){
            await database.myClose();
        });

    });

    describe('CRUD Tests:', function(){
        
        before(async function() {
            await database.myConnect();
        });

        after(async function(){
            await database.myClose();
        });

        it('InsertOne Test', async function(){
            let document = {
                name : 'Greg',
                age : 27
            };

            let result = await database.insertOne(document, 'People');
         //   console.log(result);
            if(result.insertedCount !== 1) throw new Error('Insert Count Not Equal To One');



        });

    });

});