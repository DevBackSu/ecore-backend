"use strict";

const { query } = require("express");
const db = require("../db/db_info");

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


function selectUserImgDAO(user_id){
  return new Promise((resolve, reject) => {
    const sql = `select profile_img from user where user_id = ${user_id};`;
    db.query(sql, (error, db_data) => {
      if(error){
        reject("DB ERR");
      }
      console.log(db_data);
      resolve(db_data);
    })
  })
}

function existCheck(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(u.user_id) AS cnt FROM user u WHERE u.name = "${name}" `;
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
      res_data["follower"] = db_data[2][0]["follower"];
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
      resolve(db_data);
    });
  });
}

function changeName(user_id, name, jwt_token) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE user set jwt_token = "${jwt_token}", name = "${name}" where user_id = ${user_id};`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      console.log(db_data);
      resolve(db_data);
    });
  });
}

function follow(type, user_id) {
  return new Promise((resolve, reject) => {
    var query;
    if (type == "following") {
      query = `SELECT u.profile_img, u.name FROM user u WHERE u.user_id IN (SELECT f.user_id2 from follow f WHERE f.user_id = ${user_id});`;
    } else if (type == "follower") {
      query = `SELECT u.profile_img, u.name FROM user u WHERE u.user_id IN (SELECT f.user_id from follow f WHERE f.user_id2 = ${user_id});`;
    } else throw "타입을 확인해주세요";
    console.log(query);
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      console.log(db_data);
      resolve(db_data);
    });
  });
}

function followingcheck(user_id, target_id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(f.follow_id) AS cnt FROM follow f WHERE f.user_id = ${user_id} AND f.user_id2 = ${target_id};`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      console.log(db_data);
      console.log(db_data[0].cnt);
      resolve(db_data[0].cnt);
    });
  });
}

function followPost(user_id, target_id) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO follow(user_id, user_id2) VALUE(${user_id}, ${target_id});`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function followDelete(user_id, target_id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM follow WHERE user_id = ${user_id} AND user_id2 = ${target_id};`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function followSearch(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT u.user_id, u.total_score, u.profile_img FROM user u WHERE u.name = "${name}";`;
    db.query(query, (err, db_data) => {
      if (err) reject("db_data");
      resolve(db_data);
    });
  });
}

module.exports = {
  profileUploadDAO,
  profileDeleteDAO,
  selectUserImgDAO,
  existCheck,
  userInfo,
  badge,
  changeName,
  follow,
  followPost,
  followDelete,
  followingcheck,
  followSearch,
};
