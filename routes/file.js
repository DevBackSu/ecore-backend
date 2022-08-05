const express = require('express');
const uploads = require('../middleware/multer');
const fileController = require('../controller/fileContorller');
const router = express.Router();

router.get('/', function(req, res){
    res.render('upload');
})

router.post('/', uploads.upload.single('userfile'),fileController.fileUpload);

router.use(express.static('./public/upload'))
module.exports = router;