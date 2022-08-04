'use strict'
const jwtmiddle = require("../middleware/jwt");

const campaignDAO = require('../DAO/campaignDAO');

async function Test(req, res, next){
    var jwt_token = req.headers.jwt_token;
    try{
        if (jwt_token == undefined) { 
            throw "로그인 정보가 없습니다." }
        const permission = await jwtmiddle.jwtCerti(jwt_token);
        res.json({
            "Message":"성공",
            "Data":"campaignTest"
        })
    }catch(err){
        res.json({
            "Message":"실패",
            "err": err
        })
    }
}

module.exports = {
    Test
}