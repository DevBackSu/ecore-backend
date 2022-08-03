'use strict'

const express = require('express');
const router = express.Router();
const challengeController = require('../controller/challengeContorller');

router.get('/', challengeController.challenge);

module.exports = router;