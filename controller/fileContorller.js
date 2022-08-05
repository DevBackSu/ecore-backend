const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const uploads = require('../middleware/multer');
const path = require('path');
const fileDAO = require('../DAO/fileDAO');


async function fileUpload(req, res, next){
    const filename = req.file.originalname;

    try{
        const file_detail = await fileDAO.fileUpload(filename);
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