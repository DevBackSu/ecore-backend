"use strict";

const db = require("../db/db_info");

function challenge() {
  return new Promise((resolve, reject) => {
    var USER_ID = 2;
    var queryData = `SELECT a.challenge_id, a.title, a.term, a.challenge_reward, a.participating_person, b.user_challenge_id, b.start_date FROM challenge a LEFT JOIN user_challenge b ON a.challenge_id = b.challenge_id AND b.is_challenging = 1 AND b.user_id = ${USER_ID};`;
    db.query(queryData, (err, db_data) => {
      console.log(err);
      if (err) {
        reject("db err");
      } else {
        db_data.forEach((element) => {
          if (element.user_challenge_id == null) {
            delete element.user_challenge_id;
            delete element.start_date;
            element["is_participate"] = null;
          } else {
            element["is_participate"] = {
              user_challenge_id: element.user_challenge_id,
              start_date: element.start_date,
            };
            delete element.user_challenge_id;
            delete element.start_date;
          }
        });
        resolve(db_data);
      }
    });
  });
}

function challengeDetail(parameters) {
  return new Promise((resolve, reject) => {
    var query1 = `SELECT c.detail FROM challenge c WHERE c.challenge_id = ${parameters};`;
    var query2 = `SELECT ci.example_img FROM challenge_img ci WHERE challenge_id = ${parameters};`;
    var query = `SELECT u.name, u.profile_img, cr.review_content, cr.review_img FROM user u, challenge_review cr LEFT JOIN user_challenge uc ON cr.user_challenge_id = uc.user_challenge_id WHERE uc.challenge_id=${parameters} AND u.user_id =uc.user_id;`;
    db.query(query1 + query2 + query, (err, db_data) => {
      console.log(err);
      if (err) {
        reject("db err");
      } else {
        var res_data = db_data[0];
        res_data[0]["example"] = [];
        db_data[1].forEach((element) => {
          res_data[0]["example"].push(element["example_img"]);
        });
        res_data[0]["reviews"] = db_data[2];
        resolve(res_data);
      }
    });
  });
}

module.exports = {
  challenge,
  challengeDetail,
};
