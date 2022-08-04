'use strict'

const express = require('express');
const router = express.Router();
const dailychallengeController = require('../controller/dailychallengeController');

router.get('/', dailychallengeController.Test);

module.exports=router;