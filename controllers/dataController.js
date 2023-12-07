const MigrantData = require("../models/data");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.get_all_migrant_data = asyncHandler(async (req, res) => {
  const dataForms = await Data.find().lean();

  if (!dataForms?.length) {
    return res
      .sendStatus(400)
      .json({ message: "Couldn't find any migrant data form" });
  }

  res.json(dataForms);
});

exports.migrant_data_create = [
  body("research_title")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 1000 })
    .withMessage("Title cannot be empty"),
  body("research_desc")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 1000 })
    .withMessage("Please provide a description"),
  body("questions").trim().notEmpty().withMessage("Question cannot be empty"),

  asyncHandler(async (req, res) => {
    const { research_title, research_desc, questions } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errMsg: errors.array()[0].msg,
      });
    }

    const info = await MigrantInfo.create({
      research_title,
      research_desc,
      questions,
    });

    if (info) {
      return res.status(201).json({ message: `Saved successfully` });
    } else {
      return res.status(400).json({ message: "Invalid data provided" });
    }
  }),
];

exports.migrant_data_delete = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message:
        "Oops you need an id to delete migrant data, might not be your fault, try again",
    });
  }

  const targetData = await MigrantData.findById(id).exec();

  if (!targetData) {
    return res.status(400).json({ message: "Couldn't find migrant data" });
  }

  await targetData.deleteOne();

  const message = "Migrant data deleted successfully";

  res.json(message);
});
