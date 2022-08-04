'use strict'

const express = require('express');
const router = express.Router();
const commonController = require('../controller/commonController');

router.get('/', commonController.Test);

module.exports=router;