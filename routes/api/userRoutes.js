const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userID").get(getSingleUser).put(updateUser).delete(deleteUser);

router
  .route("/:userID/friends/:friendsID")
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;
