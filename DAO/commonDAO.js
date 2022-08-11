"use strict";

const db = require("../db/db_info");

function daily_idDAO(img_id){
  return new Promise(function(resolve, reject){
    const sql = `select user_daily_challenge_id from daily_image di where daily_image_id = ${img_id};`;
    db.query(sql, function(error, db_data){
      if(error){
        reject("DB ERR");
      }
      resolve(db_data);
    })
  })
}

function dailylikeDAO(daily, user_id){
  return new Promise(function(resolve, reject){
    const sql = `insert into daily_like (user_id, user_daily_challenge_id)
    values(${user_id}, ${daily});`;
    const sql2 = `update daily_image
    set daily_good = (select count(daily_like_id) from daily_like)
    where user_daily_challenge_id = ${daily};`;
    db.query(sql + sql2, function(error, db_data){
      if(error){
        reject("DB ERR");
      }
      resolve(db_data);
    })
  })
}

function challengelikeDAO(img_id, user_id){
  return new Promise(function(resolve, reject){
    const sql = `insert into challenge_like (challenge_image_id, user_id)
    values(${img_id}, ${user_id});`;
    const sql2 = `update challenge_image
    set challenge_good = (select count(challenge_like_id) from challenge_like)
    where challenge_image_id = ${img_id};`;
    db.query(sql + sql2, function(error, db_data){
      if(error){
        reject("DB ERR");
      }
      resolve(db_data);
    })
  })
}

module.exports = {
  daily_idDAO,
  dailylikeDAO,
  challengelikeDAO
};