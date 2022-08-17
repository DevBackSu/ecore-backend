const cron = require('node-cron');

const task = cron.schedule("*/5 * * * * *", () => {
    let time = new Date().toString();
    console.log("실행 : " + time);
})

module.exprets = {
    task
}