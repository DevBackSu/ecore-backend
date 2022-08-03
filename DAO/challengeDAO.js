"use strict";

const db = require("../db/db_info");

function challenge() {
  return new Promise((resolve, reject) => {
    var USER_ID = 1;
    var queryData =
      "SELECT a.challenge_id, a.title, a.term, a.challenge_reward, a.participating_person, b.user_challenge_id, b.start_date FROM challenge a LEFT JOIN user_challenge b ON a.challenge_id = b.challenge_id AND b.is_challenging = 1 AND b.user_id = ?;";
    db.query(queryData, USER_ID, (err, db_data) => {
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

module.exports = {
  challenge,
};
