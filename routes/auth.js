const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

router.post("/login", loginLimiter, authController.login);
router.post("/signup", authController.signup);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);

module.exports = router;
