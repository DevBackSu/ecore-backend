'use strict'

const campaignDAO = require('../DAO/campaignDAO');

async function Test(req, res, next){
    try{
        res.json({
            "Message":"성공",
            "Data":"campaignTest"
        })
    }catch(err){
        res.json({
            "Message":"실패"
        })
    }
}

module.exports = {
    Test
}