const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.user_list = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.sendStatus(400).json({ message: "No users found" });
  }
  res.json(users);
});

exports.user_create = asyncHandler(async (req, res) => {
  const { username, email, password, roles } = req.body;

  if (!username || !password || !email || !roles) {
    return res.sendStatus(400).json({ message: "All fields are required!" });
  }

  // Finding duplicates
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.sendStatus(409).json({ message: "Username already exists" });
  }

  // Hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObj =
    !Array.isArray(roles) || !roles.length
      ? { username, email, password: hashedPassword }
      : {
          username,
          email,
          password: hashedPassword,
          roles,
        };

  // Save user to database
  const user = await User.create(userObj);

  if (user) {
    res.sendStatus(201).json({ message: `New user ${username} created` });
  } else {
    res.sendStatus(400).json({ mesaage: "Invalid" });
  }
});

exports.user_update = asyncHandler(async (req, res) => {
  const { id, username, email, password, roles, active } = req.body;

  if (!id) {
    return res.sendStatus(400).json({
      message: "Oops you need an id to update user, might not be your fault",
    });
  }

  if (
    !username ||
    !email ||
    !Array.isArray(roles) ||
    !roles.length ||
    !active
  ) {
    return res.sendStatus(400).json({ message: "All fields are required!" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.sendStatus(400).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.sendStatus(409).json({ message: "User already exists" });
  }

  user.username = username;
  user.email = email;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated successfully` });
});

exports.user_delete = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.sendStatus(400).json({
      message: "Oops you need an id to delete user, might not be your fault",
    });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.sendStatus(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const message = "User deleted successfully";

  res.json(message);
});
