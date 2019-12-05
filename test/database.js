const mongodb = require('mongodb');
const db = require('../source/database');

describe('Database.js Tests:', function() {

    describe('Database Opening and Closing Tests:', function() {
     
        // Tests connecting to the db
        it('Database - myOpen', async function() {
            let dbConnected = await db.myConnect();
            if(dbConnected === null) {
                throw new Error('First Error');
            }
            else{
                return true;
            }
        });

        // Tests closing the connection to the db
        it('Database - myClose', async function() {
            await db.myClose();
        });

    });

    describe('Database CRUD Tests:', function() {

        // Defines collection for use in testing
        const collection = 'TestPeople';

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

        async function setUpOne() {
            return db.insertOne(document, collection);
        }

        async function setUpMany() {
            return db.insertMany(documents, collection);
        }

        async function cleanUpOne() {
            return db.deleteOne(nameFilter, collection);
        }

        async function cleanUpMany() {
            let manyResult = await db.deleteMany({}, collection);
            if(manyResult.result.ok !== 1) throw new Error('insertMany cleanup failed');
            return manyResult;
        }

        async function setUp() {
            return Promise.all([setUpOne(), setUpMany()]);
        }

        // async function setUp(){

        // }

        // async function cleanup(){

        // }
        

        // Connects to db before testing
        before(async function() {
            await db.myConnect();
        });

        // Closes db connection after testing
        after(async function() {
            await db.myClose();
        });

        describe('Database - Insert Tests:', function() {

            // Deletes all objects created during insert testing
            after(async function() {
                let manyResult = await cleanUpMany();
                if(manyResult.result.ok !== 1) throw new Error('insertMany cleanup failed');
                let oneResult = await cleanUpOne();
                if(oneResult.result.ok !== 1) throw new Error('insertOne cleanup failed');          
            });    

            // Tests single document insert
            it('Database - insertOne()', async function() {    
                let result = await db.insertOne(document, collection);
                if(result.insertedCount !== 1) throw new Error('insertOne test failed');
            });      

            // Tests multiple document insert
            it('Database - insertMany()', async function() {
                let result = await db.insertMany(documents, collection);
                if(result.insertedCount !== documents.length) throw new Error('insertMany test failed');
            });

        });


        describe('Database - Delete Tests:', function() {

            // Creates multiple documents for deletion testing
            before(async function() {       
                let manyResult = await setUpMany();
                if(manyResult.result.ok !== 1) throw new Error('deleteMany cleanup failed');
                let oneResult = await setUpOne();
                if(oneResult.result.ok !== 1) throw new Error('deleteOne cleanup failed');
            });

            // Tests single document delete
            it('Database - deleteOne()', async function() {
                let result = await db.deleteOne(nameFilter, collection);
                if(result.result.ok !== 1) throw new Error('deleteOne test failed');
            }); 

            // Tests multiple document deletes
            it('Database - deleteMany()', async function() {
                let result = await db.deleteMany(testFilter, collection);
                if(result.result.ok !== 1) throw new Error('deleteMany test failed');
            });
            
            // Tests deleting a single document matching _id from parameter
            // it('deleteDocument Test', async function(){
            //     let result = await db.deleteDocument(document2, collection);
            //     if(result.result.ok !== 1) throw new Error('deleteDocument test failed');
            // });

        });

        describe('Database Find Tests:', function() {

            // Creates a single document used for find testing
            before(async function() {
                let manyResult = await setUpMany();
                if(manyResult.result.ok !== 1) throw new Error('find setup failed');
                let oneResult = await setUpOne();
                if(oneResult.result.ok !== 1) throw new Error('findOne setup failed');
            });

            // Deletes the single document used for find testing
            after(async function() {
                let manyResult = await cleanUpMany();
                if(manyResult.result.ok !== 1) throw new Error('find cleanup failed');
                let oneResult = await cleanUpOne();
                if(oneResult.result.ok !== 1) throw new Error('findOne cleanup failed'); 
            });

            // Tests finding first document meeting criteria
            it('Database - findOne()', async function() {
                let result = await db.findOne(nameFilter, collection);
                if(result.name !== document.name) throw new Error('findOne test Failed');
            });

            it('Database - find()', async function() {
                let result = await db.find(findQuery, collection);
                
            });
        });


        describe('Database Update Tests:', function() {

            updateOne = { $set: { name : "Batman"}};

            updateMany = { $set: { tester : false}};


            // Creates a single document used for update testing
            before(async function() {
                let manyResult = await setUpMany();
                if(manyResult.result.ok !== 1) throw new Error('updateMany setup failed');
                let oneResult = await setUpOne();
                if(oneResult.result.ok !== 1) throw new Error('updateOne setup failed');
            });

            // Deletes the single document used for update testing
            after(async function() {
                let manyResult = await cleanUpMany();
                if(manyResult.result.ok !== 1) throw new Error('updateMany cleanup failed');
            });

            it('Database - updateOne()', async () => {
                await db.updateOne(nameFilter, updateOne, collection);
                let findUpdatedResult = await db.findOne({_id : document._id}, collection);
                if(findUpdatedResult.name !== "Batman") throw new Error('updateOne on name field failed');
            });

            it('Database - updateMany()', async () => {
                let updateManyResult = await db.updateMany(testFilter, updateMany, collection);
                if(updateManyResult.result.ok !== 1) throw new Error('updateMany test result.ok != 1');
            });
        });
    });

});