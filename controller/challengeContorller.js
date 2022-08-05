"use strict";

const challengeDAO = require("../DAO/challengeDAO");

async function challenge(req, res, next) {
  try {
    const challenge_data = await challengeDAO.challenge();
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

async function challengeDetail(req, res, next){
  let parameters = req.query.challenge_id;
  try{
    const challengeDetail_date = await challengeDAO.challengeDetail(parameters);
    res.json({
      Message:"성공",
      Data:challengeDetail_date
    })
  }catch{
    res.json({
      Message:"실패",
      Error_Message:err
    })
  }
}

module.exports = {
  challenge,
  challengeDetail
};