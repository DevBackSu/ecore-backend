const db = require("../db/db_info");

async function checkfinishedDaily() {
  return new Promise((resolve, reject) => {
    const d = new Date();
    const yesterday = new Date(d.setDate(d.getDate() - 1))
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
    const query = `SELECT dc.daily_reward, udc.user_id FROM user_daily_challenge udc LEFT JOIN daily_challenge dc ON udc.daily_challenge_id = dc.daily_challenge_id WHERE udc.daily_date =${yesterday}`;
    var res_data = [];
    db.query(query, (err, db_data) => {
      console.log(db_data);
      if (err) reject(err);
      db_data.forEach((element) => {
        res_data.push([element.daily_reward, element.user_id]);
      });
      console.log(res_data);
      resolve(res_data);
    });
  });
}

async function completeDaily(info) {
  return new Promise((resolve, reject) => {
    var mysql = require("mysql");
    var querys = "";
    const query = `UPDATE user u SET u.total_score = u.total_score+?, u.daily_challenge_done = u.daily_challenge_done+1 WHERE u.user_id = ?;`;
    info.forEach((element) => {
      querys += mysql.format(query, element);
    });
    db.query(querys, (err, db_data) => {
      if (err) reject(err);
      resolve(db_data);
    });
  });
}

async function checkDailyDone(info) {
  return new Promise((resolve, reject) => {
    var mysql = require("mysql");
    var querys = "";
    const query = `SELECT u.user_id, u.daily_challenge_done FROM user u WHERE u.user_id = ?;`;
    var res_data = {
      zeroDaily: [],
      nineDaily: [],
    };
    info.forEach((element) => {
      querys += mysql.format(query, element[1]);
    });
    console.log(querys);
    db.query(querys, (err, db_data) => {
      if (err) reject(err);
      db_data.forEach((element) => {
        console.log(element);
        if (element[0].daily_challenge_done == 0)
          res_data.zeroDaily.push(element[0].user_id);
        else if (element[0].daily_challenge_done == 9)
          res_data.nineDaily.push(element[0].user_id);
      });
      console.log(res_data);
      resolve(res_data);
    });
  });
}

module.exports = {
  checkfinishedDaily,
  completeDaily,
  checkDailyDone,
};
