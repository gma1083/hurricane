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

        // Defines a single document for insertOne and deleteOne
        let document = {
            name : 'Greg',
            age : 27,
            baller : true
        };

        // Defines a single document for deleteDocument
        let document2 = {
            name : 'Gregory',
            age : 27,
            baller : true
        };

        // Defines a documents array for insertMany and deleteMany
        let documents = [
            {_id : new mongodb.ObjectID(), name : 'Izzy', age : 27, baller : false, tester : true}, 
            {_id : new mongodb.ObjectID(), name : 'Cody', age : 27, baller : true, tester : true}, 
            {_id : new mongodb.ObjectID(), name : 'DT', age : 28, baller : false, tester : true}
        ];
        

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
                let deleteOneResult = await database.deleteOne({name : document.name}, collection);
                let deleteManyResult = await database.deleteMany({tester : true}, collection);
                if(deleteOneResult.result.ok !== 1) throw new Error('insertOne cleanup failed');   
                if(deleteManyResult.result.ok !== 1) throw new Error('insertMany cleanup failed');           
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
                document._id = new mongodb.ObjectID();
                let insertOneResult = await database.insertOne(document, collection);
                let insertDocument = await database.insertOne(document2, collection);
                let insertManyResult = await database.insertMany(documents, collection);
                if(insertOneResult.insertedCount !== 1) throw new Error('deleteOne setup failed');
                if(insertDocument.insertedCount !== 1) throw new Error('deleteDocument setup failed');
                if(insertManyResult.insertedCount !== documents.length) throw new Error('deleteMany setup failed');
            });

            // Tests single document delete
            it('deleteOne Test', async function(){
                let filter = {
                    name : document.name
                };
    
                let result = await database.deleteOne(filter, collection);
                if(result.result.ok !== 1) throw new Error('deleteOne test failed');
            }); 

            // Tests multiple document deletes
            it('deleteMany Test', async function(){
                let filter = {
                    tester: true
                };

                let result = await database.deleteMany(filter, collection);
                if(result.result.ok !== 1) throw new Error('deleteMany test failed');
            });
            
            // Tests deleting a single document matching _id from parameter
            it('deleteDocument Test', async function(){
                let result = await database.deleteDocument(document2, collection);
                if(result.result.ok !== 1) throw new Error('deleteDocument test failed');
            });

        });


        describe('Find Tests:', function(){

            // Creates a single document used for find testing
            before(async function() {
                let result = await database.insertOne(document, collection);
                if(result.insertedCount !== 1) throw new Error('Find Tests setup failed');
            });

            // Deletes the single document used for find testing
            after(async function(){
                let result = await database.deleteOne({name : document.name}, collection);
                if(result.result.ok !== 1) throw new Error('Find Tests cleanup failed'); 
            });

            // Tests finding first document meeting criteria
            it('findOne Test', async function(){
                let result = await database.findOne({name : 'Greg'}, collection);
                if(result.name !== document.name) throw new Error('findOne test Failed');
            });
        });




    });

});