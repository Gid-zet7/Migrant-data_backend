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

    for (const newData of data) {
      const result = await ResearchData.findOne({
        "data.question": newData.question,
        "data.response": newData.response,
      });

      if (result) {
        await ResearchData.updateOne(
          {
            "data.question": newData.question,
            "data.response": newData.response,
          },
          { $set: { "data.value": result.data.value + 1 } }
        );
        console.log("Document updated successfully.");
      } else {
        await ResearchData.create({
          data: {
            question: newData.question,
            response: newData.response,
            value: 1,
          },
        });
        console.log("Document inserted successfully.");
      }
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
