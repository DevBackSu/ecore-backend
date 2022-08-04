'use strict'

const commonDAO = require('../DAO/commonDAO');

async function Test(req, res, next){
    try{
        res.json({
            "Message":"성공",
            "Data":"commonTest"
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