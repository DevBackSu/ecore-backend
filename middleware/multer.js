// const upload = multer({dest : './public/upload'});  //업로드를 받아낼 수 있는 미들웨어를 리턴받음. 사용자가 업로드한 파일이 저장되는 위치 지정
const multer = require('multer');

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './upload')  //첫번째 인자 : 에러 / 두번째 인자 : 이미지 파일을 저장할 폴더 위치
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)  //첫번째 인자값 : 에러 / 두번째 인자값 : 이미지 파일ㅇ르 저장할 파일명
    }
})

var upload = multer({storage:storage})


module.exports = {
    upload
}