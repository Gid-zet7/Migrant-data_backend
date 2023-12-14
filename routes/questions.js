const express = require("express");
const router = express.Router();
const questionsFormController = require("../controllers/questionsFormController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/", questionsFormController.get_all_questionsForm);
router.post("/", questionsFormController.question_form_create);
router.delete("/", questionsFormController.question_form_delete);

module.exports = router;
