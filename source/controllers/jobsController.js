const Job = require('../job');

async function returnJobs() {
    return Job.findAll();
}

async function deleteJob(jobID) {
    const job = await Job.findById(jobID);
    await job.delete();
}

module.exports = {
    returnJobs,
    deleteJob,
};