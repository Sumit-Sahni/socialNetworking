const express = require('express');
const {  registerUser,   authUser,   getUser,    getUserById,    updateUser,} = require('../controllers/userController');
const router = express.Router();
  


router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(getUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUser);



module.exports = router;
