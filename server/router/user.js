const express = require("express");
const UserController = require("../controller/User");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-login", UserController.GoogleLogin);

module.exports = router;
