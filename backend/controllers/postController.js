const Post = require('../models/post');
const User = require('../models/user');


// Create a new post
exports.createPost = async (req, res) => {
    const { title, description, field, steps,creator_id,tags,created_at } = req.body;

    try {
        // Create new post
        const post = new Post({
            creator_id,
            title,
            description,
            field,
            steps,
            tags,
            created_at
        });

        // Save post to database
        await post.save(); // Problem here
        res.status(201).json("Post created successfully");

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
}

// Get post by ID
exports.getPost = async (req, res) => {
    try {
        // Find post by ID
        const post = await Post.findById(req.params.id);
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
    const { title, description, field, steps } = req.body;

    try {
        // Find post by ID
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Update post
        post.title = title;
        post.description = description;
        post.field = field;
        post.steps = steps;

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
    try {
        // Find post by ID
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if user is creator of post
        if (post.creator_id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Delete post
        await post.remove();
        res.status(200).json("Post deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
}