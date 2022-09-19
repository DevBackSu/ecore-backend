"use strict";

const express = require("express");
const router = express.Router();
const commonController = require("../controller/commonController");
const uploads = require("../middleware/multer");

router.post("/upload", uploads.upload.single("img"),commonController.upload); //사진 등록

router.get("/image", commonController.image); //사진 불러오기

router.get("/image/zoomin", commonController.zoomin); //사진 확대

router.post("/like", commonController.like); //좋아요

router.delete("/like", commonController.likeDelete); //좋아요 취소

router.post("/report", commonController.report); //신고

module.exports = router;
