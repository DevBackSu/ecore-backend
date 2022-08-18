"use strict";

const db = require("../db/db_info");

function rank(type, user_id) {
  return new Promise((resolve, reject) => {
    var query;
    if (type == "all") {
      query = `SELECT ROW_NUMBER() OVER (
        ORDER BY total_score DESC
) row_num, u.name, u.total_score, u.profile_img, u.user_id  FROM user u`;
    } else if (type == "following") {
      query = `SELECT ROW_NUMBER() OVER (
        ORDER BY total_score DESC
) row_num, u.user_id, u.name, u.total_score, u.profile_img FROM user u WHERE u.user_id IN (SELECT f.user_id2 from follow f WHERE f.user_id = ${user_id}) OR u.user_id = ${user_id} ORDER BY u.total_score DESC;`;
    } else throw "타입을 확인해주세요";
    console.log(query);
    db.query(query, (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function myrank(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT 
	*
FROM 
    (
		SELECT ROW_NUMBER() OVER (
		            ORDER BY total_score DESC
		    ) row_num, u.name, u.total_score, u.profile_img, u.user_id  FROM user u
    ) t
WHERE t.name = '${name}'`;
    db.query(query, (err, db_data) => {
      if (err) {
        reject("db_err");
        console.log(err);
      }
      console.log(db_data);
      resolve(db_data);
    });
  });
}

module.exports = {
  rank,
  myrank,
};
