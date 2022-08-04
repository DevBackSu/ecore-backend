const db = require('../db/db_info');
const logger = require('morgan');



function fileUpload(filename){
    return new Promise(function (resolve, reject) {
      const sql = `insert into user(name, client_id, total_score, daily_challenge_done, challenge_done, jwt_token, profile_img)
                 values('a','b',10,10,10,'c', '${filename}')`;
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
    fileUpload
  }