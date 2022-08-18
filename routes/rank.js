"use strict";

const express = require("express");
const router = express.Router();
const rankController = require("../controller/rankController");

router.get("/", rankController.rank);
router.get("/myrank", rankController.myrank);

module.exports = router;
