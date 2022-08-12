'use strict'

const express = require('express');
const router = express.Router();
const commonController = require('../controller/commonController');

// router.post('/upload', commonController.upload);

// router.get('/image', commonController.image);

// router.get('/image/zoomin', commonController.zoomin);

router.post('/like', commonController.like);

router.delete('/like', commonController.likeDelete);

module.exports=router;