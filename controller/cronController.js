"use strict";

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
    
}

module.exports = {
    cronTestController,
}