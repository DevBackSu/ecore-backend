"use strict";

const db = require("../db/db_info");

function challengeInsertDAO(img_id, user_id) {
  return new Promise(function (resolve, reject) {
    const sql = `insert into challenge_like (challenge_image_id, user_id)
      values(${img_id}, ${user_id});`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function likeUpdateDAO(img_id) {
  return new Promise(function (resolve, reject) {
    const sql = `update challenge_image
        set challenge_good = (select count(challenge_like_id) from challenge_like)
        where challenge_image_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function challengeDeleteDAO(user_id, img_id) {
  return new Promise(function (resolve, reject) {
    const sql = `DELETE from challenge_like WHERE user_id = ${user_id} and challenge_image_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function reportChallengeDAO(img_id) {
  return new Promise(function (resolve, reject) {
    const sql = `update challenge_image set challenge_bad = challenge_bad + 1 where challenge_image_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function zoominChallengeDAO(img_id, user_id) {
  return new Promise(function (resolve, reject) {
    const sql = `select u.user_id, u.name, COUNT(IF(cl.user_id=${user_id},1,null)) as is_good from challenge_image ci
    left join user_challenge uc on uc.user_challenge_id = ci.user_challenge_id
    left join user u on u.user_id = uc.user_id
    left join challenge_like cl ON cl.challenge_image_id = ci.challenge_image_id 
    where ci.challenge_image_id = ${img_id};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function imageChallengeDAO(count, target, user_id, challenge_id) {
  return new Promise((resolve, reject) => {
    let query;
    if (count == "one") {
      if (target != null) throw "target is not null";
      if ( challenge_id == null) throw "id is null";
      query = `SELECT ci.challenge_image_id AS img_id, c.title AS title, ci.challenge_img AS img, ci.challenge_date AS date, ci.challenge_good AS good FROM challenge_image ci LEFT JOIN user_challenge uc ON ci.user_challenge_id = uc.user_challenge_id LEFT JOIN challenge c ON uc.challenge_id = c.challenge_id WHERE c.challenge_id = ${challenge_id} AND NOT uc.user_id = ${user_id} ORDER BY RAND() LIMIT 1;`;
    } else if (count == "all") {
      if (target == null) throw "target is null";
      if (target == user_id)
        query = `SELECT ci.challenge_image_id AS img_id, c.title AS title, ci.challenge_img AS img, ci.challenge_date AS date, SUM(ci.challenge_good)AS good, EXISTS(SELECT * FROM challenge_review WHERE cr.user_challenge_id = uc.user_challenge_id) AS is_review FROM challenge_image ci LEFT JOIN user_challenge uc ON ci.user_challenge_id = uc.user_challenge_id LEFT JOIN challenge c ON uc.challenge_id = c.challenge_id LEFT JOIN challenge_review cr ON cr.user_challenge_id = uc.user_challenge_id WHERE uc.user_id = ${user_id} AND uc.is_challenging = 0 GROUP BY uc.user_challenge_id;`;
      else
        query = `SELECT ci.challenge_image_id AS img_id, c.title AS title, ci.challenge_img AS img, ci.challenge_date AS date, ci.challenge_good AS good FROM challenge_image ci LEFT JOIN user_challenge uc ON ci.user_challenge_id = uc.user_challenge_id LEFT JOIN challenge c ON uc.challenge_id = c.challenge_id WHERE uc.user_id = ${target};`;
    } else throw "count 값을 확인해주세요.";
    console.log(query);
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function uploadChallengeDAO(target, img) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO challenge_image(user_challenge_id, challenge_img) VALUE(${target},"${img}");`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function checkUCI(target, user_id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT is_challenging FROM user_challenge WHERE user_id = ${user_id} AND user_challenge_id = ${target};`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

module.exports = {
  challengeInsertDAO,
  likeUpdateDAO,
  challengeDeleteDAO,
  reportChallengeDAO,
  zoominChallengeDAO,
  imageChallengeDAO,
  uploadChallengeDAO,
  checkUCI,
};
