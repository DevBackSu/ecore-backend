"use strict";
const jwtmiddle = require("../middleware/jwt");
const rankDAO = require("../DAO/rankDAO");

async function rank(req, res, next) {
  const jwt_token = req.headers.jwt_token;
  const type = req.query.type;
  try {
    if (jwt_token == undefined) throw "로그인 정보가 없습니다.";
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    const ranking = await rankDAO.rank(type, permission.USER_ID);
    res.json({
      Message: "성공",
      Data: ranking,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_message: err,
    });
  }
}

async function myrank(req, res, next) {
  const jwt_token = req.headers.jwt_token;
  try {
    if (jwt_token == undefined) throw "로그인 정보가 없습니다.";
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    const myrank = await rankDAO.myrank(permission.NAME);
    res.json({
      Message: "성공",
      Data: myrank,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_message: err,
    });
  }
}

module.exports = {
  rank,
  myrank,
};
