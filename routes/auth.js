"use strict";

const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.get("/", authController.Test);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
