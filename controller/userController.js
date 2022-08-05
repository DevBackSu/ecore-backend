'use strict'

const userDAO = require('../DAO/userDAO');

async function Test(req, res, next){
    try{
        res.json({
            "Message":"성공",
            "Data":"UserTest"
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