"use strict";

const cronCampaignDAO = require("../DAO/cronCampaignDAO");
const cronDAO = require("../DAO/cronDAO");

async function cronTestController(req, res, next){
    try{
        const test = await cronDAO.cronTestDAO();
        console.log(test);
        // res.json({
        //     Message : "성공",
        //     Data : test
        // })
    }
    catch(err){
        // res.json({
        //     Message : "err",
        //     Err : err
        // })
        console.log(err);
    }
}

async function dailyProcess(req, res, next){

}

async function challengeProcess(req, res, next){

}

async function campaignProcess(req, res, next){
    try{
        const end_date = await cronCampaignDAO.selectCampaignDAO();
        console.log(end_date);
        if(end_date !== undefined){
            const user_data = await cronCampaignDAO.selectUser_idDAO(end_date[0].end_date);
            console.log(user_data);
            for(var i = 0; i < user_data.length; i++){
                console.log(user_data[i].user_id);
                const campaign_data = await cronCampaignDAO.cronCampaignDAO(user_data[i].user_id);
                console.log(campaign_data);
            }
            console.log(campaign_data);
        }
        console.log("캠페인 보상 업로드 날짜가 아닙니다.");
    }
    catch(err){

    }
}

module.exports = {
    cronTestController,
    campaignProcess
}