const QuestionsForm = require("../models/questions");
const asyncHandler = require("express-async-handler");
const moment = require("moment");

exports.get_all_questionsForm = asyncHandler(async (req, res) => {
  const questionForms = await QuestionsForm.find()
    .populate("questions.options")
    .exec();

  questionForms.createdAt = moment(questionForms.createdAt).format(
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  );
  questionForms.updatedAt = moment(questionForms.updatedAt).format(
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  );

  if (!questionForms?.length) {
    return res
      .status(400)
      .json({ message: "Couldn't find any migrant data form" });
  }

  res.json(questionForms);
});

exports.question_form_create = [
  asyncHandler(async (req, res) => {
    const { migrant_id, formTitle, formDesc, questions } = req.body;

    const questionForm = await QuestionsForm.create({
      migrant_id,
      form_title: formTitle,
      form_desc: formDesc,
      questions: questions.map((question) => question),
    });

    if (questionForm) {
      return res.status(201).json({ message: `Saved successfully` });
    } else {
      return res.status(400).json({ message: "Invalid data provided" });
    }
  }),
];

exports.question_form_delete = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message:
        "Oops you need an id to delete migrant data, might not be your fault, try again",
    });
  }

  const targetForm = await QuestionsForm.findById(id).exec();

  if (!targetForm) {
    return res.status(400).json({ message: "Couldn't find migrant data" });
  }

  await targetForm.deleteOne();

  const message = "Migrant data deleted successfully";

  res.json(message);
});
