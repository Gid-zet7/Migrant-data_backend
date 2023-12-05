const express = require("express");
const asyncHandler = require("express-async-handler");

const userControllerTest = express();

userControllerTest.use(express.json());

userControllerTest.post(
  "/user/create",
  asyncHandler(async (req, res) => {
    const { username, email, password, roles } = req.body;

    if (
      !username ||
      !password ||
      !email ||
      !Array.isArray(roles) ||
      !roles.length
    ) {
      return res.sendStatus(400);
    }

    res.send({ message: "Good" });
    res.sendStatus(200);
  })
);

userControllerTest.patch(
  "/user/update",
  asyncHandler(async (req, res) => {
    const { id, username, email, password, roles } = req.body;

    // Allow update even if password is not icluded
    if (!id || !username || !email || !Array.isArray(roles) || !roles.length) {
      return res.sendStatus(400);
    }

    // if user decides to change password
    if (password) {
      return res.sendStatus(220);
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
