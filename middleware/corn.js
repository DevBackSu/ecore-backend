const cron = require('node-cron');
const cronController = require('../controller/cronController')

const task = cron.schedule("*/10 * * * * *", () => {
    let time = new Date().toString();
    console.log("실행 : " + time);
    // const a = cronController.cronTestController();
    const b = cronController.campaignProcess();
})

module.exprets = {
    task
}