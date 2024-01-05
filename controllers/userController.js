const { User, Thought } = require("../models");

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get single user by ID
async function getSingleUser(req, res) {
  try {
    const singleUser = await User.findOne({ _id: req.params.userID })
      .populate("friends")
      .populate("thoughts");
    res.json(singleUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

//Create new user
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Update user by ID
async function updateUser(req, res) {
  try {
    const updateUser = await User.findOneAndUpdate(req.body);
    res.json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    const updateUser = await User.findOneAndRemove({ _id: req.params.userID });
    res.json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
