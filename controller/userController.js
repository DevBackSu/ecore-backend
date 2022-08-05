'use strict'

const express = require('express');
const userDAO = require('../DAO/userDAO');
const jwtmiddle = require('../middleware/jwt')

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

async function profileUpload(req, res, next){
    var jwt_token = req.headers.jwt_token;

    console.log(req.file + " / " + jwt_token);

    const filename= req.file.originalname;
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    parameters.user_id = permission.USER_ID;
    
    try{
        const file_detail = await fileDAO.profileUploadDAO(parameter.user_id, filename);
        res.json({
            "Message" : "성공",
            "데이터" : file_detail
        })
    }
    catch(error){
        res.json({
            "Message" : "실패",
            "데이터" : error
        })
    }
}

module.exports = {
    Test,
    profileUpload
}