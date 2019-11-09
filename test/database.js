const mongodb = require('mongodb');
const database = require('../source/database');

describe('Jobs Testing', function() {

    describe('Opening and Closing Tests:', function(){
     
        // Tests connecting to the database
        it('Testing myConnect', async function(){
            let db = await database.myConnect();
            if(db === null) {
                throw new Error('First Error');
            }
            else{
                return true;
            }
        });

        // Tests closing the connection to the database
        it('Testing myClose', async function(){
            await database.myClose();
        });

    });

    describe('CRUD Tests:', function(){

        // Defines collection for use in testing
        const collection = 'People';

        let document = {
            _id : new mongodb.ObjectID(),
            name: 'Greg',
            age : 27,
            sex : 'M',
            tester : true
        };

        // Defines a documents array for insertMany and deleteMany
        let documents = [
            {_id : new mongodb.ObjectID(), name : 'Gregory', age : 27, sex : 'M', tester : true},
            {_id : new mongodb.ObjectID(), name : 'Izzy', age : 27, sex : 'F', tester : true},
            {_id : new mongodb.ObjectID(), name : 'Cody', age : 27, sex : 'M', tester : true},
            {_id : new mongodb.ObjectID(), name : 'Zoe', age : 26, sex : 'F', tester : true},
            {_id : new mongodb.ObjectID(), name : 'Ian', age : 28, sex : 'M', tester : true},
            {_id : new mongodb.ObjectID(), name : 'Kaelah', age : 28, sex : 'M', tester : true},
            {_id : new mongodb.ObjectID(), name : 'Milad', age : 27, sex : 'M', tester : true},
            {_id : new mongodb.ObjectID(), name : 'Bruna', age : 26, sex : 'F', tester : true}
        ];

        let testFilter = {
            tester : true
        };

        let findQuery = {
            age : 27
        };

        let nameFilter = {
            name : 'Greg'
        };

        async function setUpOne(){
            return database.insertOne(document, collection);
        }

        async function setUpMany(){
            return database.insertMany(documents, collection);
        }

        async function cleanUpOne(){
            return database.deleteOne(nameFilter, collection);
        }

        async function cleanUpMany(){
            let manyResult = await database.deleteMany(testFilter, collection);
            if(manyResult.result.ok !== 1) throw new Error('insertMany cleanup failed');
            return manyResult;
        }

        async function setUp(){
            return Promise.all([setUpOne(), setUpMany()]);
        }

        // async function setUp(){

        // }

        // async function cleanup(){

        // }
        

        // Connects to database before testing
        before(async function() {
            await database.myConnect();
        });

        // Closes database connection after testing
        after(async function(){
            await database.myClose();
        });

        describe('Insert Tests:', function(){

            // Deletes all objects created during insert testing
            after(async function(){
                let manyResult = await cleanUpMany();
                if(manyResult.result.ok !== 1) throw new Error('insertMany cleanup failed');
                let oneResult = await cleanUpOne();
                if(oneResult.result.ok !== 1) throw new Error('insertOne cleanup failed');          
            });    

            // Tests single document insert
            it('InsertOne Test', async function(){    
                let result = await database.insertOne(document, collection);
                if(result.insertedCount !== 1) throw new Error('insertOne test failed');
            });      

            // Tests multiple document insert
            it('Insert Many Test', async function(){
                let result = await database.insertMany(documents, collection);
                if(result.insertedCount !== documents.length) throw new Error('insertMany test failed');
            });

        });


        describe('Delete Tests:', function(){

            // Creates multiple documents for deletion testing
            before(async function(){       
                let manyResult = await setUpMany();
                if(manyResult.result.ok !== 1) throw new Error('deleteMany cleanup failed');
                let oneResult = await setUpOne();
                if(oneResult.result.ok !== 1) throw new Error('deleteOne cleanup failed');
            });

            // Tests single document delete
            it('deleteOne Test', async function(){
                let result = await database.deleteOne(nameFilter, collection);
                if(result.result.ok !== 1) throw new Error('deleteOne test failed');
            }); 

            // Tests multiple document deletes
            it('deleteMany Test', async function(){
                let result = await database.deleteMany(testFilter, collection);
                if(result.result.ok !== 1) throw new Error('deleteMany test failed');
            });
            
            // Tests deleting a single document matching _id from parameter
            // it('deleteDocument Test', async function(){
            //     let result = await database.deleteDocument(document2, collection);
            //     if(result.result.ok !== 1) throw new Error('deleteDocument test failed');
            // });

        });


        describe('Find Tests:', function(){

            // Creates a single document used for find testing
            before(async function() {
                let manyResult = await setUpMany();
                if(manyResult.result.ok !== 1) throw new Error('find setup failed');
                let oneResult = await setUpOne();
                if(oneResult.result.ok !== 1) throw new Error('findOne setup failed');
            });

            // Deletes the single document used for find testing
            after(async function(){
                let manyResult = await cleanUpMany();
                if(manyResult.result.ok !== 1) throw new Error('find cleanup failed');
                let oneResult = await cleanUpOne();
                if(oneResult.result.ok !== 1) throw new Error('findOne cleanup failed'); 
            });

            // Tests finding first document meeting criteria
            it('findOne Test', async function(){
                let result = await database.findOne(nameFilter, collection);
                if(result.name !== document.name) throw new Error('findOne test Failed');
            });

            it('find Test', async function(){
                let result = await database.find(findQuery, collection);
                
            });
        });




    });

});