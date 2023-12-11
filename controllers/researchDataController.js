const ResearchData = require("../models/researchData");
const asyncHandler = require("express-async-handler");

exports.get_all_data = asyncHandler(async (req, res) => {
  const allData = await ResearchData.find().lean().exec();

  if (!allData?.length) {
    return res
      .status(400)
      .json({ message: "Couldn't find any migrant data form" });
  }

  res.json(allData);
});

exports.data_create = [
  asyncHandler(async (req, res) => {
    const { data } = req.body;

    console.log(data);
    const newData = await ResearchData.create({
      data,
    });

    if (newData) {
      return res.status(201).json({ message: `Saved successfully` });
    } else {
      return res.status(400).json({ message: "Invalid data provided" });
    }
  }),
];

exports.data_delete = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message:
        "Oops you need an id to delete migrant data, might not be your fault, try again",
    });
  }

  const targetData = await ResearchData.findById(id).exec();

  if (!targetData) {
    return res.status(400).json({ message: "Couldn't find migrant data" });
  }

  await targetData.deleteOne();

  const message = "Migrant data deleted successfully";

  res.json(message);
});
