var express = require("express");
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
