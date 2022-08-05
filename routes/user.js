'use strict'

const express = require('express');
const uploads = require('../middleware/multer');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.Test);
router.put('/profilepicture',uploads.upload.single('userfile'),userController.profileUpload);

module.exports=router;