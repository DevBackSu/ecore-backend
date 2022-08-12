"use strict";

const express = require("express");
const uploads = require("../middleware/multer");
const router = express.Router();
const userController = require("../controller/userController");

router.put(
  "/profilepicture",
  uploads.upload.single("userfile"),
  userController.profileUpload
); //프로필 사진 업로드
router.get("/name/exist", userController.existCheck);
router.get("/info", userController.userInfo);
router.get("/badge", userController.badge);
router.put("/nickname", userController.changeName);
router.get("/follow", userController.follow);

module.exports = router;
