const db = require("../db/db_info");

function cronTestDAO() {
  return new Promise((resolve, reject) => {
    const sql = `select * from badge;`;
    db.query(sql, (error, db_data) => {
      if (error) {
        reject("DB ERR");
      }
      resolve(db_data);
    });
  });
}

function checkFinishedChallenge() {
  return new Promise((resolve, reject) => {
    const d = new Date();
    const query = `SELECT uc.user_challenge_id, count(ci.challenge_image_id) AS img_cnt, c.achievement_condition FROM user_challenge uc LEFT JOIN challenge c ON uc.challenge_id = c.challenge_id LEFT JOIN challenge_image ci ON uc.user_challenge_id = ci.user_challenge_id WHERE uc.is_challenging = 1 AND DATE_ADD(uc.start_date, INTERVAL c.term DAY) = "${d.getFullYear()}${(
      "0" +
      (d.getMonth() + 1)
    ).slice(-2)}${("0" + d.getDate()).slice(
      -2
    )}" GROUP BY uc.user_challenge_id ;`;
    var res_data = {
      faildUCI: [],
      successUCI: [],
    };
    db.query(query, (err, db_data) => {
      if (err) {
        reject("db_err");
      }
      db_data.forEach((element) => {
        if (element.img_cnt < element.achievement_condition)
          res_data.faildUCI.push(`${element.user_challenge_id}`);
        else res_data.successUCI.push(`${element.user_challenge_id}`);
      });
      resolve(res_data);
    });
  });
}

function deleteFailtUC(faildUCI) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM user_challenge WHERE user_challenge_id IN (?);";
    db.query(query, [faildUCI], (err, db_data) => {
      if (err) reject("db_err");
      resolve(db_data);
    });
  });
}

function checkReward(successUCI) {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT uc.user_challenge_id, c.challenge_reward AS reward FROM user_challenge uc LEFT JOIN challenge c ON uc.challenge_id = c.challenge_id WHERE uc.user_challenge_id IN (?);";
    const res_data = [];
    db.query(query, [successUCI], (err, db_data) => {
      if (err) reject("db_err");
      db_data.forEach((element) => {
        res_data.push([element.reward, element.user_challenge_id]);
      });
      resolve(res_data);
    });
  });
}

function completeChallenge(info) {
  return new Promise((resolve, reject) => {
    var mysql = require("mysql");
    var querys = "";
    const query =
      "UPDATE user_challenge uc LEFT JOIN user u ON uc.user_id = u.user_id SET uc.is_challenging = 0, u.total_score = u.total_score+?, u.challenge_done = u.challenge_done+1 WHERE uc.user_challenge_id = ?;";
    info.forEach((element) => {
      querys += mysql.format(query, element);
    });
    db.query(querys, (err, db_data) => {
      if (err) {
        reject("db_err");
      }
      resolve(db_data);
    });
  });
}

function checkUserChallengeDone(info) {
  return new Promise((resolve, reject) => {
    var mysql = require("mysql");
    var querys = "";
    var res_data = {
      zeroChallenge: [],
      nineChallenge: [],
    };
    const query =
      "SELECT u.user_id, u.challenge_done FROM user u LEFT JOIN user_challenge uc ON u.user_id = uc.user_id WHERE uc.user_challenge_id = ?;";
    info.forEach((element) => {
      querys += mysql.format(query, Number(element));
    });
    console.log(querys);
    db.query(querys, (err, db_data) => {
      if (err) reject(err);
      console.log(db_data);
      db_data.forEach((element) => {
        if (element[0].challenge_done == 0)
          res_data.zeroChallenge.push(element[0].user_id);
        else if (element[0].challenge_done == 9)
          res_data.nineChallenge.push(element[0].user_id);
      });
      console.log(res_data);
      resolve(res_data);
    });
  });
}

module.exports = {
  cronTestDAO,
  checkFinishedChallenge,
  deleteFailtUC,
  checkReward,
  completeChallenge,
  checkUserChallengeDone,
};
