const Job = require('../job');
const Address = require('../address');
const Client = require('../client');

async function insertJob(jobData) {
    const jobValues = {};
    const addressID = await Address.addressToID(jobData.address);
    const clientID = await Client.nameToID(jobData.client);

    Object.assign(jobValues, jobData);

    jobValues.addressID = addressID;
    timesheetValues.clientID = clientID;
    
    const job = new Job(jobValues);
    return job.save();
}

async function updateJob(jobData) {
    jobData._id = new mongodb.ObjectID(jobData._id);
    const job = new Job(jobData);
    await job.updateOne();
}

module.exports = {
    insertJob,
    updateJob,
};