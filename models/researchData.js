const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResearchDataModel = new Schema(
  {
    migrant_id: {
      type: String,
      required: false,
    },
    data: {
      question: { type: String, required: true },
      response: { type: String, required: true },
      value: { type: Number, required: false, default: 1 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResearchData", ResearchDataModel);
