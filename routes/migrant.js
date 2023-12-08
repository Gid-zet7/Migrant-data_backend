const express = require("express");
const router = express.Router();
const migrantController = require("../controllers/migrantController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/", migrantController.get_all_migrantInfo);
router.post("/", migrantController.migrant_info_create);
router.patch("/", migrantController.migrant_info_update);
router.delete("/", migrantController.migrant_info_delete);

module.exports = router;
