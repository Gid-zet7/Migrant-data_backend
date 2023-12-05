const express = require("express");
const asyncHandler = require("express-async-handler");

const userControllerTest = express();

userControllerTest.use(express.json());

userControllerTest.post(
  "/user/create",
  asyncHandler(async (req, res) => {
    const { username, email, password, roles } = req.body;

    if (!username || !password || !email || !roles) {
      return res.sendStatus(400);
    }

    res.send({ message: "Good" });
    res.sendStatus(200);
  })
);

userControllerTest.post(
  "/user/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    res.sendStatus(200).json({ message: "Good" });
  })
);

module.exports = userControllerTest;
