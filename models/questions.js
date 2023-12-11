const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionsFormModel = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    form_title: {
      type: String,
      required: true,
    },
    form_desc: {
      type: String,
      required: true,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        questionType: { type: String, required: true },
        options: [{ optionText: String }],
        open: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuestionsForm", QuestionsFormModel);
