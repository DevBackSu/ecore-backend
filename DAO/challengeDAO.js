"use strict";

const db = require("../db/db_info");

function challenge(USER_ID) {
  return new Promise((resolve, reject) => {
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
        res_data[0]["review"] = db_data[2];
        resolve(res_data);
      }
    });
  });
}

function challengeStart(challenge_id, USER_ID) {
  return new Promise((resolve, reject) => {
    const query1 = `INSERT INTO user_challenge(user_id, challenge_id, start_date) VALUE(${USER_ID},${challenge_id},now());`;
    const query2 = `SELECT user_challenge_id FROM user_challenge WHERE user_id = ${USER_ID} AND challenge_id = ${challenge_id} AND start_date = curdate()`;
    db.query(query1 + query2, (err, db_data) => {
      if (err) {
        console.log(err);
        reject("db_err");
      } else {
        console.log(db_data);
        resolve(db_data[1]);
      }
    });
  });
}

function challengeUploadDetail(user_challenge_id) {
  return new Promise((resolve, reject) => {
    const query1 = `SELECT c.good_example , c.bad_example , c.achievement_condition FROM challenge c WHERE c.challenge_id = (SELECT uc.challenge_id FROM user_challenge uc WHERE uc.user_challenge_id=${user_challenge_id});`;
    const query2 = `SELECT ci.challenge_img , ci.challenge_date FROM challenge_image ci WHERE ci.user_challenge_id =${user_challenge_id};`;
    db.query(query1 + query2, (err, db_data) => {
      if (err) {
        console.log(err);
        reject("db_err");
      } else {
        var res_data = db_data[0];
        if (db_data[1][0] == null) res_data[0]["my_challenge"] = null;
        else {
          res_data[0]["my_challenge"] = [];
          db_data[1].forEach((element) => {
            res_data[0]["my_challenge"].push({
              challenge_img: element["challenge_img"],
              challenge_data: element["challenge_date"],
            });
          });
        }
        resolve(res_data);
      }
    });
  });
}

function challengeMyDetail(user_challenge_id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ci.challenge_img, ci.challenge_good, ci.challenge_date FROM challenge_image ci WHERE ci.user_challenge_id =${user_challenge_id}`;
    db.query(query, (err, db_data) => {
      if (err) {
        console.log(err);
        reject("db_err");
      } else {
        resolve(db_data);
      }
    });
  });
}

function challengeImage(challenge_id, USER_ID) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ci.user_challenge_id, ci.challenge_img FROM challenge_image ci WHERE ci.user_challenge_id IN (SELECT uc.user_challenge_id FROM user_challenge uc WHERE uc.challenge_id=${challenge_id} AND uc.user_id=${USER_ID}) LIMIT 1`;
    db.query(query, (err, db_data) => {
      if (err) {
        console.log(err);
        reject("db_err");
      } else {
        const res_data = {
          challenge_img: db_data[0]["challenge_img"],
          user_challenge_id: db_data[0]["user_challenge_id"],
        };
        resolve(res_data);
      }
    });
  });
}

function challengeReview(user_challenge_id, review_content, challenge_img) {
  return new Promise((resolve, reject) => {
    console.log(user_challenge_id, review_content, challenge_img);
    const query = `INSERT INTO challenge_review(user_challenge_id, review_content, review_img) VALUE(${user_challenge_id}, "${review_content}", "${challenge_img}");`;
    db.query(query, (err, db_data) => {
      if (err) {
        console.log(err);
        reject("db_err");
      } else {
        resolve(db_data);
      }
    });
  });
}

module.exports = {
  challenge,
  challengeDetail,
  challengeStart,
  challengeUploadDetail,
  challengeMyDetail,
  challengeImage,
  challengeReview,
};
