"use strict";

const express = require("express");
const userDAO = require("../DAO/userDAO");
const jwtmiddle = require("../middleware/jwt");
const fs = require("fs");

async function profileUpload(req, res, next) {
  var jwt_token = req.headers.jwt_token;

  console.log(req.file + " / " + jwt_token);

  const filename = req.file.originalname;
  const permission = await jwtmiddle.jwtCerti(jwt_token);
  console.log(permission.USER_ID);
  try {
    const profile_data = await userDAO.profileDeleteDAO(permission.USER_ID);

    const file_data = profile_data[0].profile_img;
    fs.unlink("upload/" + file_data, (err) => {
      if (err) console.error(err);
    });

    const file_detail = await userDAO.profileUploadDAO(
      permission.USER_ID,
      filename
    );
    res.json({
      Message: "성공",
      데이터: file_detail,
    });
  } catch (error) {
    res.json({
      Message: "실패",
      데이터: error,
    });
  }
}

async function existCheck(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  var name = req.query.name;

  try {
    if (jwt_token == undefined) throw "로그인 정보가 없습니다.";
    const check_data = await userDAO.existCheck(name);
    console.log(check_data);
    var message;
    if (check_data[0] == null) message = "possible";
    else message = "exist";
    res.json({
      Message: "성공",
      Data: message,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_message: err,
    });
  }
}

async function userInfo(req, res, next) {
  var jwt_token = req.headers.jwt_token;
  var user_id = req.query.user_id;

  try {
    if (jwt_token == undefined) throw "로그인 정보가 없습니다.";
    const info_data = await userDAO.userInfo(user_id);
    res.json({
      Message: "성공",
      Data: info_data,
    });
  } catch (err) {
    res.json({
      Message: "실패",
      Error_message: err,
    });
  }
}

async function badge(req, res, next){
  var jwt_token = req.headers.jwt_token;
  try{
    if(jwt_token == undefined) throw "로그인 정보가 없습니다.";
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    const badge_data = await userDAO.badge(permission.USER_ID);
    res.json({
      Message:"성공",
      Data:badge_data
    })
  }catch(err){
    res.json({
      Mesasge:"실패",
      Error_message:err
    })
  }
}

module.exports = {
  profileUpload,
  existCheck,
  userInfo,
  badge,
};
