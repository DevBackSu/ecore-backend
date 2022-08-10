"use strict";

const express = require("express");
const router = express.Router();
const challengeController = require("../controller/challengeContorller");

router.get("/", challengeController.challenge);
router.get("/detail", challengeController.challengeDetail);
router.post("/start", challengeController.challengeStart);
router.get("/upload/detail", challengeController.challengeUploadDetail);
router.get("/my/detail", challengeController.challengeMyDetail);
router.post("/review", challengeController.challengeReview);
module.exports = router;
