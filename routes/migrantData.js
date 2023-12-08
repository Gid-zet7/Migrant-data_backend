const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataFormController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/", dataController.get_all_migrant_data);
router.post("/", dataController.migrant_data_create);
router.delete("/", dataController.migrant_data_delete);

module.exports = router;
