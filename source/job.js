const database = require('./database');
const collectionName = 'Jobs';

class Job{

    constructor(job){

        this.jobNumber = job.jobNumber;
        this.jobSite = job.jobSite;
        this.timeSheets = job.timeSheets;

    }

    async save(){
        return datebase.insertOne(this, collectionName);
    }

    async validate(){
        if(this.jobNumber !== 
    }



}


module.exports = Job;