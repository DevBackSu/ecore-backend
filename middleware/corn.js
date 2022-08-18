const cron = require('node-cron');
const cronController = require('../controller/cronController')

const task = cron.schedule("*/5 * * * * *", () => {
    let time = new Date().toString();
    console.log("실행 : " + time);
    const a = cronController.cronTestController();
    cronController.challengeProcess();
})

module.exprets = {
    task
}