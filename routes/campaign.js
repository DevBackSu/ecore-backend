'use strict'

const express = require('express');
const router = express.Router();
const campaignController = require('../controller/campaignController');

router.get('/', campaignController.Test);

module.exports=router;