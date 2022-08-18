const cron = require('node-cron');
const cronController = require('../controller/cronController')

const task = cron.schedule("*/10 * * * * *", () => {
    let time = new Date().toString();
    console.log("실행 : " + time);
<<<<<<< HEAD
    // const a = cronController.cronTestController();
    const b = cronController.campaignProcess();
=======
    const a = cronController.cronTestController();
    cronController.challengeProcess();
>>>>>>> 220972b7b6e9cd0a6e26783a3f6e976efe806b61
})

module.exprets = {
    task
}