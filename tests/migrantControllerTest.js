const express = require("express");
const asyncHandler = require("express-async-handler");

const migrantControllerTest = express();

migrantControllerTest.use(express.json());

migrantControllerTest.post(
  "/migrant/create",
  asyncHandler(async (req, res) => {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      contact,
      migration_status,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !date_of_birth ||
      !nationality ||
      !contact ||
      !migration_status
    ) {
      return res.sendStatus(400);
    }

    res.send({ message: "Good" });
    res.sendStatus(200);
  })
);

migrantControllerTest.patch(
  "/migrant/update",
  asyncHandler(async (req, res) => {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      contact,
      migration_status,
    } = req.body;

    // Allow update even if gender is not icluded
    if (
      !first_name ||
      !last_name ||
      !date_of_birth ||
      !nationality ||
      !contact ||
      !migration_status
    ) {
      return res.sendStatus(400);
    }

    res.send({ message: "Good" });
    res.sendStatus(200);
  })
);

migrantControllerTest.post(
  "/migrant/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    res.sendStatus(200).json({ message: "Good" });
  })
);

module.exports = migrantControllerTest;
