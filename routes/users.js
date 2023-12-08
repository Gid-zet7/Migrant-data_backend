const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/", userController.user_list);
router.post("/", userController.user_create);
router.patch("/", userController.user_update);
router.delete("/", userController.user_delete);

module.exports = router;
