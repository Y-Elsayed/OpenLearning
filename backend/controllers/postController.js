const Post = require('../models/post');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// Create a new post
exports.createPost = async (req, res) => {

    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ msg: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret key
        const creatorId = decoded.user.id;

        const { title, description, field, steps, tags } = req.body;
        // Create new post
        const post = new Post({
            creatorId,
            title,
            description,
            field,
            steps,
            tags,
        });

        // Save post to database
        await post.save();
        res.status(201).json({ msg: 'Post created successfully' }); // Success response
    } catch (err) {
        console.error(err.message);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        res.status(500).json('Server error');
    }
}

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        // Find all posts
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 1);
        const limitNumber = parseInt(limit, 10);
        if (pageNumber < 1 || limitNumber < 1) {
            // Handle invalid page and limit values
            return res.status(400).json({ error: 'Page and limit must be positive integers.' });
        }

        const posts = await Post.find()
            .select('title thumbnail description field createdAt creatorId') // later could add feedback and comments when they are implemented.
            .populate('creatorId','username') // add the user profile picture later
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .exec();

        // Get total documents count
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limitNumber);
        res.json({
            posts,
            page: pageNumber,
            totalPages
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
}

// Get post by ID
exports.getPost = async (req, res) => {
    try {
        // Find post by ID
        const post = await Post.findById(req.params.id).populate('creatorId', 'username'); // add the user details later (profile picture, bio, etc.)
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
}

// Update post by ID
exports.updatePost = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ msg: 'No token provided, authorization denied' });
    }
    const { title, description, field, steps,tags } = req.body;

    try {
        // Find post by ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // Check if Object ID is valid
            return res.status(400).json({ error: "Invalid ID format" });
        }        
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Update post
        post.title = title;
        post.description = description;
        post.field = field;
        post.steps = steps;
        post.tags = tags;

        // Save post to database
        await post.save();
        res.status(200).json("Post updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
}

// Delete post by ID
exports.deletePost = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ msg: 'No token provided, authorization denied' });
    }

    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Find post by ID
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // Check if user is the creator of the post
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (post.creatorId.toString() !== decoded.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // Delete post
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json('Post deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
}