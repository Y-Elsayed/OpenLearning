const express = require('express');


const router = express.Router();
const { createPost, getPost, updatePost, deletePost } = require('../controllers/postController');

// Create Post
router.post("/", createPost);

//Get All Posts
router.get("/", getPosts);

// Get Post by ID
router.get("/:id", getPost);

// Update Post by ID
router.put("/:id", updatePost);

// Delete Post by ID
router.delete("/:id", deletePost);

module.exports = router;