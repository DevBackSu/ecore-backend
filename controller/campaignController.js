'use strict'
const jwtmiddle = require("../middleware/jwt");

const campaignDAO = require('../DAO/campaignDAO');

async function campaign(req, res, next){
    var jwt_token = req.headers.jwt_token;
    try{
        if (jwt_token == undefined) { throw "로그인 정보가 없습니다." }
        const campaign_data = await campaignDAO.campaignDAO();
        res.json({
            "Message" : "성공",
            "Data" : campaign_data
        })
    }catch(err){
        res.json({
            "Message" : "Error",
            "ERR" : err
        })
    }
}

async function campaignother(req, res, next){
    // var jwt_token = req.headers.jwt_token;
    const campaign_id = req.query.campaign_id;
    try{
        // if (jwt_token == undefined) { throw "로그인 정보가 없습니다." }
        const campaign_other_data = await campaignDAO.campaignotherDAO(campaign_id);
        res.json({
            "Message" : "성공",
            "Data" : campaign_other_data
        })
    }catch(err){
        res.json({
            "Message" : "Error",
            "ERR" : err
        })
    }
}

module.exports = {
    campaign,
    campaignother,
}