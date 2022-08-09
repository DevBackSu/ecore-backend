const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const uploads = require('../middleware/multer');
const path = require('path');
const fileDAO = require('../DAO/fileDAO');
const jwtmiddle = require('../middleware/jwt')


async function fileUpload(req, res, next){
    var jwt_token = req.headers.jwt_token;

    console.log(req.file + " / " + jwt_token);

    const filename= req.file.originalname;
    const permission = await jwtmiddle.jwtCerti(jwt_token);
    parameters.user_id = permission.USER_ID;

    const type = req.body.type;
    const target = req.body.target;
    
    try{
        const file_detail = await fileDAO.fileUploadDAO(type, target, parameter.user_id, filename);
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
    fileUpload,
}