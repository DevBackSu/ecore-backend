'use strict'

const jwtmiddle = require("../middleware/jwt");
const commonDAO = require('../DAO/commonDAO');

async function like(req, res, next){
    var jwt_token = req.headers.jwt_token;
    const {type, img_id} = req.body;
    let like_data;
    console.log(type, img_id);
    try{
        if(jwt_token == undefined) {    throw "로그인 정보가 없습니다."    }
        const permission = await jwtmiddle.jwtCerti(jwt_token);
        if(type == 'daily')
        {
            const daily_id = await commonDAO.daily_idDAO(img_id);
            const daily = daily_id[0].user_daily_challenge_id;
            like_data = await commonDAO.dailylikeDAO(daily, permission.USER_ID);
        }
        else if(type == 'challenge')
        {
            like_data = await commonDAO.challengelikeDAO(img_id, permission.USER_ID);
        }
        else{
            throw "존재하지 않는 타입입니다."
        }
        res.json({
            "Message":"성공",
        })
    }catch(err){
        console.log(err);
        res.json({
            "Message":"실패",
            "Err" : err
        })
    }
}

module.exports = {
    like
}