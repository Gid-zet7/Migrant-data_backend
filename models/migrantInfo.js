const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MigrantInfoModel = new Schema(
  {
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
      phone: String,
      email: String,
    },

    migration_status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MigrantInfo", MigrantInfoModel);
