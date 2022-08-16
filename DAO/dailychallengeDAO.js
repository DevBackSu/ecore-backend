"use strict";

const db = require("../db/db_info");

function dailychallengeDAO(day, USER_ID) {
  return new Promise(function (resolve, reject) {
    const d = new Date();
    const sql = `select dc.title, dc.daily_reward, di.daily_img, di.daily_good, udc.daily_date from daily_challenge dc
    left join user_daily_challenge udc on udc.daily_challenge_id = dc.daily_challenge_id and udc.user_id = ${USER_ID} AND udc.daily_date = "${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}"
    left join daily_image di on di.user_daily_challenge_id = udc.user_daily_challenge_id
    where dc.daily_challenge_id = ${day};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      db_data.forEach((element) => {
        if (element.daily_img == null) {
          delete element.daily_img;
          delete element.daily_good;
          delete element.daily_date;
          element["info"] = null;
        } else {
          element["info"] = {
            daily_img: element.daily_img,
            daily_good: element.daily_good,
            daily_date: element.daily_date,
          };
          delete element.daily_img;
          delete element.daily_good;
          delete element.daily_date;
        }
      });
      resolve(db_data);
    });
  });
}

function dailychallengedetailsDAO(day) {
  return new Promise(function (resolve, reject) {
    const sql = `select daily_challenge_id, detail, good_ex, bad_ex from daily_challenge dc 
    where daily_challenge_id = ${day};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

module.exports = {
  dailychallengeDAO,
  dailychallengedetailsDAO,
};
