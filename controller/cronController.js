"use strict";

const cronCampaignDAO = require("../DAO/cronCampaignDAO");
const cronDAO = require("../DAO/cronDAO");
const cronChallengeDAO = require("../DAO/cronChallengeDAO");

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
    const d = new Date();
    try{        
        const temp = new Date(d.setDate(d.getDate()-1)).toISOString().split("T")[0];
        const selectCampaignDAO_data = await cronCampaignDAO.selectCampaignDAO(temp);
        if(selectCampaignDAO_data[0]==undefined);
        else cronCampaignDAO.selectUser_idDAO(selectCampaignDAO_data);
        console.log("campaignProcess done");
    }
    catch(err){
        console.log("DB ERR");
    }
}

module.exports = {
    cronTestController,
    campaignProcess,
    challengeProcess
}