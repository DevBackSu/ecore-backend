'use strict'

const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/', authController.Test);

module.exports=router;