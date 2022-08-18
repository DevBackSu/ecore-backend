const cron = require('node-cron');
const cronController = require('../controller/cronController')

const task = cron.schedule("*/10 * * * * *", () => {
    let time = new Date().toString();
    console.log("실행 : " + time);
    const b = cronController.campaignProcess();
    cronController.challengeProcess();
})

module.exprets = {
    task
}