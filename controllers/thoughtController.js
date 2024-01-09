const { Thought } = require("../models");

// Get all thoughts
async function getAllThoughts(req, res) {
  try {
    const thought = await Thought.find();

    if (!thought) {
      return res.status(404).json({ message: "No thought found" });
    }

    return res
      .status(200)
      .json({ thought, message: "Thought displayed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get single thought
async function singleThought(req, res) {
  try {
    const newSingleThought = await Thought.findOne({
      _id: req.params.thoughtID,
    });
    if (!newSingleThought) {
      return res.status(404).json({ message: "No thought found" });
    }

    return res
      .status(200)
      .json({ newSingleThought, message: "Thought found by ID" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Create new thought
async function createThought(req, res) {
  try {
    const newThought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });

    if (!newThought) {
      return res.status(404).json({ message: "No thought found" });
    }

    return res
      .status(200)
      .json({ newThought, message: "Thought created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Update thought
async function updateThought(req, res) {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $set: req.body },
      { new: true }
    );

    if (!updateThought) {
      return res.status(404).json({ message: "No thought found" });
    }

    return res
      .status(200)
      .json({ updateThought, message: "Thought updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete thought
async function deleteThought(req, res) {
  try {
    const deleteThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtID,
    });

    if (!deleteThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    return res
      .status(200)
      .json({ deleteThought, message: "Thought deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Add Reaction
async function addReaction(req, res) {
  try {
    const addReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    if (!addReaction) {
      return res.status(404).json({ message: "No thought found" });
    }

    return res
      .status(200)
      .json({ addReaction, message: "Reaction added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete reaction
async function deleteReaction(req, res) {
  try {
    const deleteReaction = await Thought.findOneAndDelete(
      { _id: req.params.thoughtID },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    );

    if (!deleteReaction) {
      return res.status(404).json({ message: "Reaction not found" });
    }

    return res
      .status(200)
      .json({ deleteReaction, message: "Reaction deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllThoughts,
  createThought,
  singleThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
