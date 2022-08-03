'use strict'

const challengeDAO = require('../DAO/challengeDAO');

async function challenge(req, res, next){
    try{
        const challenge_data = await challengeDAO.challenge();
        // console.log(challenge_data);
        res.json({
            "Message":"성공",
            "Data": challenge_data
        });
    }
    catch (err){
        res.json({
            "Message": "실패",
            "Error_Message":err
        })
    }
}

module.exports = {
    challenge
}