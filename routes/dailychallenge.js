'use strict'

const express = require('express');
const router = express.Router();
const dailychallengeController = require('../controller/dailychallengeController');

router.get('/', dailychallengeController.dailychallenge);

router.get('/details', dailychallengeController.dailychallengedetails);

module.exports=router;