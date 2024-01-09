const { User, Thought } = require("../models");

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "Wrong path" });
    }

    return res.status(200).json({ users, message: "All users found" });
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

    if (!singleUser) {
      return res.status(404).json({ message: "User ID not found" });
    }

    return res.status(200).json({ singleUser, message: "User found by ID" });
  } catch (err) {
    res.status(500).json(err);
  }
}

//Create new user
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);

    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ createUser, message: "User created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Update user by ID
async function updateUser(req, res) {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { $set: req.body },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ updateUser, message: "User updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete user
async function deleteUser(req, res) {
  try {
    const updateUser = await User.findOneAndRemove({ _id: req.params.userID });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Thought.deleteMany({ _id: { $in: updateUser.thoughts } });

    return res
      .status(200)
      .json({ updateUser, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createFriend(req, res) {
  try {
    const newFriend = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { $addToSet: { friends: req.params.friendsID } },
      { new: true }
    );

    if (!newFriend) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ newFriend, message: "New friend added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteFriend(req, res) {
  try {
    const removeFriend = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friends: req.params.friendsID } },
      { new: true }
    );

    if (!removeFriend) {
      return res.status(404).json({ message: "No user found" });
    }

    return res
      .status(200)
      .json({ removeFriend, message: "Friend deleted successfully" });
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
  createFriend,
  deleteFriend,
};
