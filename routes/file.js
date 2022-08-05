const express = require('express');
const uploads = require('../middleware/multer');
const fileController = require('../controller/fileContorller');
const router = express.Router();

router.get('/', function(req, res){
    res.render('upload');
})

//사진 등록
router.post('/', uploads.upload.single('userfile'),fileController.fileUpload);

router.use(express.static('./upload'))
module.exports = router;