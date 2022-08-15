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

function zoominChallengeDAO(img_id){
  return new Promise(function(resolve, reject){
    const sql = `select u.user_id, u.name, ci.challenge_img from challenge_image ci
    left join user_challenge uc on uc.user_challenge_id = ci.user_challenge_id
    left join user u on u.user_id = uc.user_id 
    where ci.challenge_image_id = ${img_id};`;
    db.query(sql, function(error,db_data){
      if(error){
        reject("DB ERR");
      }
      resolve(db_data);
    });
  })
}

module.exports = {
  challengeInsertDAO,
  likeUpdateDAO,
  challengeDeleteDAO,
  reportChallengeDAO,
  zoominChallengeDAO
};
