"use strict";

const jwtmiddle = require("../middleware/jwt");
const commonDailyDAO = require("../DAO/commonDailyDAO");
const commonChallengeDAO = require("../DAO/commonChallengeDAO");

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
        console.log("dkfjdkfjdkf");
      await commonChallengeDAO.challengeInsertDAO(img_id,permission.USER_ID);
      console.log("ElfhdELfhdELfhddkdkkkdkdkdkdkdkddkdkdkdkks");
      like_data = await commonChallengeDAO.likeUpdateDAO(img_id);
      console.log("여기냐?");
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
      await commonChallengeDAO.challengeDeleteDAO(permission.USER_ID,img_id);
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

module.exports = {
  like,
  likeDelete,
};
