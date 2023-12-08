const MigrantInfo = require("../models/migrantInfo");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.get_all_migrantInfo = asyncHandler(async (req, res) => {
  const allInfo = await MigrantInfo.find().lean();

  if (!allInfo?.length) {
    return res.status(400).json({ message: "Couldn't find any migrant info" });
  }

  res.json(allInfo);
});

exports.migrant_info_create = [
  body("first_name")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 1000 })
    .withMessage("First name cannot be empty"),
  body("last_name")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 1000 })
    .withMessage("Last name cannot be empty"),
  body("gender").trim(),
  body("date_of_birth")
    .trim()
    .notEmpty()
    .withMessage("Date of birth cannot be empty")
    .escape(),
  body("nationality")
    .trim()
    .notEmpty()
    .withMessage("Nationality cannot be empty"),
  body("address").trim().escape(),
  body("phone").trim().escape(),
  body("email").trim().escape(),
  body("migration_status")
    .trim()
    .notEmpty()
    .withMessage("Migration status cannot be empty"),

  asyncHandler(async (req, res) => {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      address,
      phone,
      email,
      migration_status,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errMsg: errors.array()[0].msg,
      });
    }

    const contact_info = { address, phone, email };

    const info = await MigrantInfo.create({
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      contact_info,
      migration_status,
    });

    if (info) {
      return res.status(201).json({ message: `Saved successfully` });
    } else {
      return res.status(400).json({ message: "Invalid data provided" });
    }
  }),
];

exports.migrant_info_update = [
  body("first_name")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 1000 })
    .withMessage("First name cannot be empty"),
  body("last_name")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 1000 })
    .withMessage("Last name cannot be empty"),
  body("gender").trim(),
  body("date_of_birth")
    .trim()
    .notEmpty()
    .withMessage("Date of birth cannot be empty")
    .escape(),
  body("nationality")
    .trim()
    .notEmpty()
    .withMessage("Nationality cannot be empty"),
  body("address").trim().escape(),
  body("phone").trim().escape(),
  body("email").trim().escape(),
  body("migration_status")
    .trim()
    .notEmpty()
    .withMessage("Migration status cannot be empty"),

  asyncHandler(async (req, res) => {
    const {
      id,
      first_name,
      last_name,
      gender,
      date_of_birth,
      nationality,
      address,
      phone,
      email,
      migration_status,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errMsg: errors.array()[0].msg,
      });
    }

    const targetInfo = await MigrantInfo.findById(id).exec();

    if (!targetInfo) {
      return res.status(400).json({ message: "Info not found" });
    }

    const contact_info = { address, phone, email };

    targetInfo.first_name = first_name;
    targetInfo.last_name = last_name;
    targetInfo.gender = gender;
    targetInfo.date_of_birth = date_of_birth;
    targetInfo.nationality = nationality;
    targetInfo.contact_info = contact_info;
    targetInfo.migration_status = migration_status;

    await targetInfo.save();

    res.json("Migrant info updated successfully");
  }),
];

exports.migrant_info_delete = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message:
        "Oops you need an id to delete migrant info, might not be your fault, try again",
    });
  }

  const targetInfo = await MigrantInfo.findById(id).exec();

  if (!targetInfo) {
    return res.status(400).json({ message: "Couldn't find migrant info" });
  }

  await targetInfo.deleteOne();

  const message = "Migrant info deleted successfully";

  res.json(message);
});
