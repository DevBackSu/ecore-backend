'use strict'
const jwtmiddle = require("../middleware/jwt");
const dailychallengeDAO = require('../DAO/dailychallengeDAO');

async function dailychallenge(req, res, next){
    var jwt_token = req.headers.jwt_token;
    const now = new Date();
    const day = now.getDay();
    try{
        if(jwt_token == undefined) {    throw "로그인 정보가 없습니다."    }
        const permission = await jwtmiddle.jwtCerti(jwt_token);
        const dailychallenge_data = await dailychallengeDAO.dailychallengeDAO(day, permission.USER_ID);
        res.json({
            "Message":"성공",
            "Data": dailychallenge_data
        })
    }catch(err){
        console.log(err);
        res.json({
            "Message":"실패",
            "Err" : err
        })
    }

}

async function dailychallengedetails(req, res, next){
    var jwt_token = req.headers.jwt_token;
    const now = new Date();
    const day = now.getDay();
    try{
        if(jwt_token == undefined) {  throw "로그인 정보가 없습니다."  }
        const dailychallenge_data = await dailychallengeDAO.dailychallengedetailsDAO(day);
        res.json({
            "Message":"성공",
            "Data": dailychallenge_data
        })
    }catch(err){
        res.json({
            "Message":"실패",
            "Err" : err
        })
    }
}

module.exports = {
    dailychallenge,
    dailychallengedetails,
}