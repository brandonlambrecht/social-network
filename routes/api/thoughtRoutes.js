const router = require("express").Router();

const {
  getAllThoughts,
  createThought,
  singleThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:thoughtID")
  .get(singleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtID/reactions").post(addReaction);

router.route("/:thoughtID/reactions/:reactionID").delete(deleteReaction);

module.exports = router;
