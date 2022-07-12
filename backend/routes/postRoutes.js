const express = require('express');
const router = express.Router();
const {addBlog, updateById, updateLikes, getById, getEverythings } = require('../controllers/postController');





router.route("/").post(addBlog);
router.route("/:id").put(updateById);
router.route("/:id/likes").put(updateLikes);
router.route("/:id").get(getById);
router.route("/all").get(getEverythings);

module.exports = router;
