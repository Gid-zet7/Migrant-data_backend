const express = require("express");
const router = express.Router();
const researchDataController = require("../controllers/researchDataController");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router.get("/", researchDataController.get_all_data);
router.post("/", researchDataController.data_create);
router.delete("/", researchDataController.data_delete);

module.exports = router;
