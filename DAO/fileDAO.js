const db = require('../db/db_info');
const logger = require('morgan');

function fileUploadDAO(type, target, parameter, filename){
  return new Promise(function (resolve, reject) {
    if(type == "daily"){
      resolve("일일도전")
    }
    else if(type == "challenge"){
      resolve("도전")
    }
    else if(type == "campaign"){
      resolve("캠페인")
    }
    else{
      reject("잘못된 정보입니다.");
    }
    // const sql = `UPDATE user set profile_img = '${filename}' where user_id = ${parameter};`;
    // db.query(sql, function (error, db_data) {
    //   if (error) {
    //     reject("DB ERR");
    //   }
    //   resolve(db_data);
    // });
  });
}

module.exports = {
  fileUploadDAO
}