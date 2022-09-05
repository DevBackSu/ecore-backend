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

function zoominDailyDAO(img_id, user_id) {
  return new Promise(function (resolve, reject) {
    const sql = ` select u.user_id, u.name, COUNT(IF(dl.user_id=${user_id},1,null)) as is_good from daily_image di
    left join user_daily_challenge udc on udc.user_daily_challenge_id = di.user_daily_challenge_id
    left join user u on u.user_id = udc.user_id
    LEFT JOIN daily_like dl on dl.user_daily_challenge_id = di.user_daily_challenge_id 
    where di.daily_image_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function imageDailyDAO(count, target, user_id) {
  return new Promise((resolve, reject) => {
    let query;
    const d = new Date();
    if (count == "one") {
      if (target != null) throw "target is not null";
      query = `SELECT di.daily_image_id AS img_id, dc.title AS title, di.daily_img AS img, udc.daily_date AS date, di.daily_good AS good FROM daily_image di LEFT JOIN user_daily_challenge udc ON di.user_daily_challenge_id = udc.user_daily_challenge_id LEFT JOIN daily_challenge dc ON udc.daily_challenge_id = dc.daily_challenge_id WHERE udc.daily_challenge_id = ${d.getDay()} AND NOT udc.user_id = ${user_id} ORDER BY RAND() LIMIT 1;`;
    } else if (count == "all") {
      if (target == null) throw "target is null";
      query = `SELECT di.daily_image_id AS img_id, dc.title AS title, di.daily_img AS img, udc.daily_date AS date, di.daily_good AS good FROM daily_image di LEFT JOIN user_daily_challenge udc ON di.user_daily_challenge_id = udc.user_daily_challenge_id LEFT JOIN daily_challenge dc ON udc.daily_challenge_id = dc.daily_challenge_id WHERE udc.user_id = ${target} ;`;
    } else throw "count 값을 확인해주세요.";
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function uploadDailyDAO(target, img) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO daily_image(user_daily_challenge_id, daily_img) VALUE(${target}, "${img}");`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function insertUDC(user_id) {
  return new Promise((resolve, reject) => {
    const d = new Date();
    const query = `INSERT INTO user_daily_challenge(user_id, daily_challenge_id) VALUE(${user_id}, ${d.getDay()});`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      console.log(db_data);
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
  zoominDailyDAO,
  imageDailyDAO,
  uploadDailyDAO,
  insertUDC,
};
