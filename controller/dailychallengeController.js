'use strict'

const dailychallengeDAO = require('../DAO/dailychallengeDAO');

async function Test(req, res, next){
    try{
        res.json({
            "Message":"성공",
            "Data":"dailychallengeTest"
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