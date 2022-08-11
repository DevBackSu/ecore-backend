"use strict";

const { query } = require("express");
const db = require("../db/db_info");

//
function profileUploadDAO(parameter, filename) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE user set profile_img = '${filename}' where user_id = ${parameter};`;
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function profileDeleteDAO(parameter) {
  return new Promise(function (resolve, reject) {
    const sql = `select profile_img from user where user_id = ${parameter};`;
    console.log(sql);
    db.query(sql, function (error, db_data) {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function existCheck(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT u.name FROM user u WHERE u.name = "${name}" `;
    db.query(query, (err, db_data) => {
      if (err) {
        reject("db_err");
      }
      resolve(db_data);
    });
  });
}

function userInfo(user_id) {
  return new Promise((resolve, reject) => {
    const query1 = `SELECT u.name, u.total_score, u.profile_img, u.daily_challenge_done, u.challenge_done FROM user u WHERE user_id =${user_id};`;
    const query2 = `SELECT COUNT(f.follow_id) AS following FROM follow f WHERE f.user_id = ${user_id};`;
    const query3 = `SELECT COUNT(f.follow_id) AS follower FROM follow f WHERE f.user_id2 = ${user_id};`;
    db.query(query1 + query2 + query3, (err, db_data) => {
      if (err) reject("db_err");
      var res_data = db_data[0][0];
      res_data["following"] = db_data[1][0]["following"];
      res_data["follwer"] = db_data[2][0]["follower"];
      console.log(res_data);
      resolve(res_data);
    });
  });
}

function badge(user_id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT b.title, b.badge_img, b.detail, ub.badge_date FROM badge b LEFT JOIN user_badge ub ON (b.badge_id = ub.badge_id AND ub.user_id = ${user_id})`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      console.log(db_data);
      console.log(user_id);
      resolve(db_data);
    });
  });
}

module.exports = {
  profileUploadDAO,
  profileDeleteDAO,
  existCheck,
  userInfo,
  badge,
};
