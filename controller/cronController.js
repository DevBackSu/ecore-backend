"use strict";

const cronCampaignDAO = require("../DAO/cronCampaignDAO");
const cronDAO = require("../DAO/cronDAO");
const cronChallengeDAO = require("../DAO/cronChallengeDAO");
const { challengeDeleteDAO } = require("../DAO/commonChallengeDAO");

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
    try{
        const checkFinishedChallenge_data = await cronChallengeDAO.checkFinishedChallenge();
        if (checkFinishedChallenge_data.faildUCI[0] == undefined);
        else await cronChallengeDAO.deleteFailtUC(checkFinishedChallenge_data.faildUCI);
        if (checkFinishedChallenge_data.successUCI[0] == undefined);
        else{ 
            var checkReward_data = await cronChallengeDAO.checkReward(checkFinishedChallenge_data.successUCI);
            await cronChallengeDAO.completeChallenge(checkReward_data);
        }
        console.log("challengeProcess done");
    }catch(err){
        console.log("db_err");
    }
}

async function campaignProcess(req, res, next){
    var campaign_data;
    try{
        const end_date = await cronCampaignDAO.selectCampaignDAO();
        if(end_date !== undefined){
            const user_data = await cronCampaignDAO.selectUser_idDAO(end_date[0].end_date);
            for(var i = 0; i < user_data.length; i++){
                campaign_data = await cronCampaignDAO.cronCampaignDAO(user_data[i].user_id);
            }
            console.log(campaign_data);
        }
        console.log("캠페인 보상 업로드 날짜가 아닙니다.");
    }
    catch(err){
        console.log("DB ERR");
    }
}

module.exports = {
    cronTestController,
<<<<<<< HEAD
    campaignProcess
=======
    challengeProcess
>>>>>>> 220972b7b6e9cd0a6e26783a3f6e976efe806b61
}