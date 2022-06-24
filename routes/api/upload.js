const express = require('express');
const router = express.Router();
const authMiddleware = require("../../Middlewares/authMiddleware");
const upload = require("../../Middlewares/uploadMiddleware");
const {usersController} = require("../../Controllers/usersController");

router.patch("/avatars", authMiddleware, upload.single('avatar'), usersController);

module.exports = router;