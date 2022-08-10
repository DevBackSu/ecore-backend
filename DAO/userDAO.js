"use strict";

const db = require("../db/db_info");

//
function profileUploadDAO(parameter, filename){
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

function profileDeleteDAO(parameter){
  return new Promise(function(resolve, reject){
    const sql = `select profile_img from user where user_id = ${parameter};`
    console.log(sql);
    db.query(sql, function(error, db_data){
      if(error){
        reject("DB ERR");
      }
      resolve(db_data);
    })
  })
}

module.exports = {
  profileUploadDAO,
  profileDeleteDAO,
};