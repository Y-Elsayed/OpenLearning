const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register a new user
exports.userRegister = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword, gender, dateOfBirth } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            gender,
            dateOfBirth
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();
        res.status(201).json({ msg: 'User created successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login user
exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user._id
            }
        };

        // Sign the JWT
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600000 }, // 1 hour expiration
            (err, token) => {
                if (err) throw err;
                // Send the JWT to the client
                res.status(200).json({ token, msg: 'Login successful' });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
};


// Logout user
// simple logout since we're in the early stages, later on we'll adopt JWT blacklisting or other advanced techniques.
exports.userLogout = (req, res) => {
    res.json({ msg: 'User logged out' });
};