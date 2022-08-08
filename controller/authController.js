"use strict";
const jwtmiddle = require("../middleware/jwt");
const authDAO = require("../DAO/authDAO");

async function Test(req, res, next) {
  try {
    res.json({
      "Message": "성공",
      "Data": "authTest",
    });
  } catch (err) {
    res.json({
      "Message": "실패",
    });
  }
}
async function login(req, res, next) {
  const client_id = req.body.client_id;

  try {
    const auth_data = await authDAO.login(client_id);

    res.json({
      "Message": "성공",
      "Data": auth_data,
    });
  } catch (err) {
    res.json({
      "Message": "실패",
    });
  }
}

async function register(req, res, next) {
  const client_id = req.body.client_id;
  const name = req.body.name;

  try {
    const auth_data = await authDAO.register(client_id, name);

    const userData = {
    "USER_ID": auth_data.insertId,
    "NAME": name,
  }; 

  const jwtToken = await jwtmiddle.jwtCreate(userData);
  const resData = await authDAO.insert_jwt(userData.USER_ID, jwtToken);
  
  const jwtData = {
    "success": true,
    "jwt_token": jwtToken,
  }; 


    res.json({
      "Message": "성공",
      "Data": jwtData,
    });
  } catch (err) {
    res.json({
      "Message": "실패",
    });
  }
}
module.exports = {
  Test,
  login,
  register,
};
