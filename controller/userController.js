'use strict'

const express = require('express');
const userDAO = require('../DAO/userDAO');
const jwtmiddle = require('../middleware/jwt')
const fs = require("fs");

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
    console.log(permission.USER_ID);
    try{
        const profile_data = await userDAO.profileDeleteDAO(permission.USER_ID);

        const file_data = profile_data[0].profile_img;
        fs.unlink('upload/' + file_data, (err) => {if(err)   console.error(err);})

        const file_detail = await userDAO.profileUploadDAO(permission.USER_ID, filename);
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