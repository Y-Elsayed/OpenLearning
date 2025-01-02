const express = require('express');


const router = express.Router();
const { createPost, getPost, updatePost, deletePost } = require('../controllers/postController');

router.post("/posts", createPost);           // Create Post
router.get("/posts/:id", getPost);           // Get Post by ID
router.put("/posts/:id", updatePost);        // Update Post by ID
router.delete("/posts/:id", deletePost);     // Delete Post by ID

module.exports = router;