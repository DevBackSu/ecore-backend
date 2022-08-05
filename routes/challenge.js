'use strict'

const express = require('express');
const router = express.Router();
const challengeController = require('../controller/challengeContorller');

router.get('/', challengeController.challenge);
router.get('/detail',challengeController.challengeDetail);

module.exports = router;