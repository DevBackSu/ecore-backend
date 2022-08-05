"use strict";

const db = require("../db/db_info");

//
function profileUploadDAO(parameter, filename){
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE user set profile_img = '${filename}' where user_id = ${parameter};`;
    db.query(sql, function (error, db_data) {
      if (error) {
      // logger("eee",logger.error)
      //   logger.error(
      //     "DB error [notice]" + "\n \t" + sql + "\n \t" + error
      //   );
        reject("DB ERR");
      }
      // console.log(db_data);
      resolve(db_data);
    });
  });
}

module.exports = {
  profileUploadDAO
};