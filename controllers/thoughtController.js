const { Thought, Routes } = require("../models");

async function getAllThoughts(req, res) {
  try {
    const thought = await Thought.find();

    if (!thought) {
      return res.status(404).json({ message: "No thought found" });
    }

    return res
      .status(200)
      .json({ thought, message: "Thought inputed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllThoughts,
};
