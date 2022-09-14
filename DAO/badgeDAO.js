"use strict";

const db = require("../db/db_info");
var mysql = require("mysql");

function registerBadge(user_id) {
  return new Promise((resolve, reject) => {
    const sql = `insert into user_badge(user_id, badge_id)
        values(${user_id}, 3)`;
    db.query(sql, (err, db_data) => {
      if (err) {
        reject("db err");
      } else {
        resolve(db_data);
      }
    });
  });
}

function oneChallengeBadge(user_id) {
  return new Promise((resolve, reject) => {
    var querys = "";
    const query = `insert into user_badge(user_id, badge_id) VALUE(?, 1);`;
    user_id.forEach((element) => {
      querys += mysql.format(query, element);
    });
    db.query(querys, (err, db_data) => {
      if (err) reject(err);
      resolve(db_data);
    });
  });
}

function tenChallengeBadge(user_id) {
  return new Promise((resolve, reject) => {
    var querys = "";
    const query = `insert into user_badge(user_id, badge_id) VALUE(?, 4);`;
    user_id.forEach((element) => {
      querys += mysql.format(query, element);
    });
    db.query(querys, (err, db_data) => {
      if (err) reject(err);
      resolve(db_data);
    });
  });
}

function oneDailyBadge(user_id) {
  return new Promise((resolve, reject) => {
    var querys = "";
    const query = `INSERT INTO user_badge(user_id, badge_id) VALUE(?, 2);`;
    user_id.forEach((element) => {
      querys += mysql.format(query, element);
    });
    db.query(querys, (err, db_data) => {
      if (err) reject(err);
      resolve(db_data);
    });
  });
}

function tenDailyBadge(user_id) {
  return new Promise((resolve, reject) => {
    var querys = "";
    const query = `INSERT INTO user_badge(user_id, badge_id) VALUE(?, 5);`;
    user_id.forEach((element) => {
      querys += mysql.format(query, element);
    });
    db.query(querys, (err, db_data) => {
      if (err) reject(err);
      resolve(db_data);
    });
  });
}

module.exports = {
  registerBadge,
  oneChallengeBadge,
  tenChallengeBadge,
  oneDailyBadge,
  tenDailyBadge,
};
