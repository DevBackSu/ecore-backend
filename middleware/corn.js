const cron = require('node-cron');
const cronController = require('../controller/cronController')

const task = cron.schedule("*/10 * * * * *", () => {
    cronController.campaignProcess();
    cronController.challengeProcess();
    cronController.dailyProcess();
})

module.exprets = {
    task
}