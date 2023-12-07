const express = require("express");
const asyncHandler = require("express-async-handler");

const dataControllerTest = express();

dataControllerTest.use(express.json());

dataControllerTest.post(
  "/data/create",
  asyncHandler(async (req, res) => {
    const { research_title, research_desc, questions } = req.body;

    if (!research_title || !research_desc || !questions) {
      return res.sendStatus(400);
    }

    res.send({ message: "Good" });
    res.sendStatus(200);
  })
);

dataControllerTest.post(
  "/data/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    res.sendStatus(200).json({ message: "Good" });
  })
);

module.exports = dataControllerTest;
