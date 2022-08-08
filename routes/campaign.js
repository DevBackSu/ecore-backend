'use strict'

const express = require('express');
const router = express.Router();
const campaignController = require('../controller/campaignController');

router.get('/', campaignController.campaign); //캠페인 사진 목록
router.get('/other_img', campaignController.campaignother); //캠페인 참여자 사진

module.exports=router;