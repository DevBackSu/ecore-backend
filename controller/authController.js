'use strict'

const authDAO = require('../DAO/authDAO');

async function Test(req, res, next){
    try{
        res.json({
            "Message":"성공",
            "Data":"authTest"
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