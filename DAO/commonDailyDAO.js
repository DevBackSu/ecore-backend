"use strict";

const db = require("../db/db_info");

function daily_idDAO(img_id) {
  //user_daily_challenge_id 가져오기
  return new Promise(function (resolve, reject) {
    const sql = `select user_daily_challenge_id from daily_image di where daily_image_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function dailylikeDAO(daily, user_id) {
  //daily_like 테이블에 insert
  return new Promise(function (resolve, reject) {
    const sql = `insert into daily_like (user_id, user_daily_challenge_id)
    values(${user_id}, ${daily});`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function likeUpdateDAO(img_id) {
  //daily_image 테이블 update
  return new Promise(function (resolve, reject) {
    const sql = `update daily_image
    set daily_good = (select count(daily_like_id) from daily_like)
    where user_daily_challenge_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function dailyDeleteDAO(user_id, daily) {
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM daily_like WHERE user_id=${user_id} AND user_daily_challenge_id = ${daily}`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function reportDailyDAO(img_id) {
  return new Promise(function (resolve, reject) {
    const sql = `update daily_image set daily_bad = daily_bad + 1 where daily_image_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

module.exports = {
  daily_idDAO,
  likeUpdateDAO,
  dailylikeDAO,
  dailyDeleteDAO,
  reportDailyDAO,
};
