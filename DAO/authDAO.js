"use strict";

const db = require("../db/db_info");

function login(client_id) {
  return new Promise((resolve, reject) => {
    const queryData = `SELECT count(*) as cnt FROM user u WHERE client_id ="${client_id}"`;
    db.query(queryData, (err, db_data) => {
      if (err) {
        reject("db err");
      } else {
        console.log(db_data[0].cnt);
        if (db_data[0].cnt == 0) {
          const resData = { "success": true, "jwt_token": null, "is_new": true };

          resolve(resData);
        } else {
          const queryData = `SELECT jwt_token, user_id FROM user u WHERE client_id ="${client_id}"`;   
          db.query(queryData, (err, db_data) =>{
            if (err) {
              reject("db err");
            } else {
              const resData = { "success": true,"user_id": db_data[0].user_id, "jwt_token": db_data[0].jwt_token, "is_new": false };
              console.log(resData);
              resolve(resData); 
            }
          }); 
        }
      }
    });
  });
}

function register(client_id, name,jwtToken) {
  return new Promise((resolve, reject) => {
    const queryData = `INSERT INTO user(name, client_id, jwt_token) VALUE("${name}", "${client_id}", "${jwtToken}")`;
    db.query(queryData, (err, db_data) => {
      if (err) {
        console.log(err);
        reject("db err");
      } else {
        console.log(db_data);
        resolve(db_data);
      }
    });
  });
}
module.exports = {
  login,
  register,
};
