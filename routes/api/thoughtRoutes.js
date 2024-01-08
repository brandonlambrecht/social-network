const router = require("express").Router();

const { getAllThoughts } = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts);

// router.route("/:userID").get(getSingleUser).put(updateUser).delete(deleteUser);

// router
//   .route("/:userID/friends/:friendsID")
//   .post(createFriend)
//   .delete(deleteFriend);

module.exports = router;
