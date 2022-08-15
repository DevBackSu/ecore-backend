"use strict";

const jwtmiddle = require("../middleware/jwt");
const commonDailyDAO = require("../DAO/commonDailyDAO");
const commonChallengeDAO = require("../DAO/commonChallengeDAO");
const commonCampaignDAO = require("../DAO/commonCampaignDAO");

async function like(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  const { type, img_id } = req.body;
  let like_data;
  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    if (type == "daily") {
      const daily_id = await commonDailyDAO.daily_idDAO(img_id);
      const daily = daily_id[0].user_daily_challenge_id;
      await commonDailyDAO.dailylikeDAO(daily, permission.USER_ID);
      like_data = await commonDailyDAO.likeUpdateDAO(img_id);
    } else if (type == "challenge") {
      await commonChallengeDAO.challengeInsertDAO(img_id, permission.USER_ID);
      like_data = await commonChallengeDAO.likeUpdateDAO(img_id);
    } else {
      throw "존재하지 않는 타입입니다.";
    }
    res.json({
      Message: "성공",
    });
  } catch (err) {
    console.log(err);
    res.json({
      Message: "실패",
      Err: err,
    });
  }
}

async function likeDelete(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  const { type, img_id } = req.body;
  let like_data;
  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    if (type == "daily") {
      // user_daily_challenge_id 가져오기
      const daily_id = await commonDailyDAO.daily_idDAO(img_id);
      const daily = daily_id[0].user_daily_challenge_id;
      await commonDailyDAO.dailyDeleteDAO(permission.USER_ID, daily); //delete
      like_data = await commonDailyDAO.likeUpdateDAO(img_id); //update
    } else if (type == "challenge") {
      await commonChallengeDAO.challengeDeleteDAO(permission.USER_ID, img_id);
      like_data = await commonChallengeDAO.likeUpdateDAO(img_id);
    } else {
      throw "존재하지 않는 타입입니다.";
    }
    res.json({
      Message: "성공",
    });
  } catch (err) {
    console.log(err);
    res.json({
      Message: "실패",
      ERR: err,
    });
  }
}

async function report(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  const { type, img_id } = req.body;
  let report_data;
  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    if (type == "daily") {
      report_data = await commonDailyDAO.reportDailyDAO(img_id);
    } else if (type == "challenge") {
      report_data = await commonChallengeDAO.reportChallengeDAO(img_id);
    } else {
      throw "존재하지 않는 타입입니다.";
    }
    res.json({
      Message: "성공",
    });
  } catch (err) {
    res.json({
      Message: "실패",
      ERR: err,
    });
  }
} 

async function zoomin(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  const { type, img_id } = req.query;
  let zoomin_data;
  try{
    if(jwt_token == undefined)  throw "로그인 정보가 없습니다."
    if(type == "daily"){
      zoomin_data = await commonDailyDAO.zoominDailyDAO(img_id);
    }
    else if(type == "challenge"){
      zoomin_data = await commonChallengeDAO.zoominChallengeDAO(img_id);
    }
    else{
      throw "존재하지 않는 타입입니다."
    }
    res.json({
      "Message" : "성공",
      Data : zoomin_data
    })
  }catch(err){
    res.json({
      "Message" : "실패",
      ERR : err
    })
  }
}

async function image(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  const { type, count, target } = req.query;

  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    let image_data;
    if (type == "daily") image_data = await commonDailyDAO.imageDailyDAO(count, target);
    else if (type == "challenge")
      image_data = await commonChallengeDAO.imageChallengeDAO(count, target);
    else if (type == "campaign")
      image_data = await commonCampaignDAO.imageCapaignDAO(count, target);
    else{
      throw "존재하지 않는 타입입니다.";
    }
    res.json({
      Message: "성공",
      Data: image_data,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_Message: err,
    });
  }
}

async function upload(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  const { type, target, img } = req.body;
  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    let upload_data;
    if (type == "daily") upload_data = await commonDailyDAO.uploadDailyDAO(target, img);
    else if (type == "challenge")
      upload_data = await commonChallengeDAO.uploadChallengeDAO(target, img);
    else if (type == "campaign")
      upload_data = await commonCampaignDAO.uploadCapaignDAO(target, img);
    else throw "타입없음.";
    res.json({
      Message: "성공",
      Data: upload_data,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_Message: err,
    });
  }
}

module.exports = {
  like,
  likeDelete,
  report,
  zoomin,
  upload,
  image,
};
