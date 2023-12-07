const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DataFormModel = new Schema(
  {
    migrant_id: {
      type: Schema.Types.ObjectId,
      ref: "MigrantInfo",
      required: true,
    },
    research_title: {
      type: String,
      required: true,
    },
    research_desc: {
      type: String,
      required: true,
    },
    questions: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DataCollectionForm", DataFormModel);
