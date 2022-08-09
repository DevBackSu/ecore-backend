"use strict";
const jwtmiddle = require("../middleware/jwt");

const challengeDAO = require("../DAO/challengeDAO");

async function challenge(req, res, next) {
  var jwt_token = req.headers.jwt_token;

  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    console.log(permission);
    const challenge_data = await challengeDAO.challenge(permission.USER_ID);
    // console.log(challenge_data);
    res.json({
      Message: "성공",
      Data: challenge_data,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_Message: err,
    });
  }
}

async function challengeDetail(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  let parameters = req.query.challenge_id;
  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    const challengeDetail_data = await challengeDAO.challengeDetail(parameters);
    res.json({
      Message: "성공",
      Data: challengeDetail_data,
    });
  } catch {
    res.json({
      Message: "실패",
      Error_Message: err,
    });
  }
}

async function challengeStart(req, res, next) {
  const jwt_token = req.headers.jwt_token;
  const challenge_id = req.body.challenge_id;
  try {
    if (jwt_token == undefined) {
      throw "로그인 정보가 없습니다.";
    }
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    const challengeStart_data = await challengeDAO.challengeStart(
      challenge_id,
      permission.USER_ID
    );
    res.json({
      Message: "성공",
      Data: challengeStart_data,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_Message: err,
    });
  }
}

async function challengeUploadDetail(req, res, next) {
  const jwt_token = req.headers.jwt_token;
  const user_challenge_id = req.query.user_challenge_id;
  try {
    if (jwt_token == undefined) throw "로그인 정보가 없습니다.";
    const challengeUploadDetail_data = await challengeDAO.challengeUploadDetail(
      user_challenge_id
    );
    res.json({
      Message: "성공",
      Data: challengeUploadDetail_data,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_Message: err,
    });
  }
}

module.exports = {
  challenge,
  challengeDetail,
  challengeStart,
  challengeUploadDetail,
};
