const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MigrantInfoModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    first_name: {
      type: String,
      minLength: 3,
      required: true,
    },

    last_name: {
      type: String,
      minLength: 3,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    date_of_birth: {
      type: Date,
      required: true,
    },

    nationality: {
      type: String,
      required: true,
    },

    contact_info: {
      address: String,
      phone: Number,
      email: String,
    },

    migartion_status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MigrantInfo", MigrantInfoModel);
