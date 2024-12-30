const express = require('express');

const { userRegister, userLogin, userLogout } = require('../controllers/userController');

const router = express.Router();

// Register route
router.post('/register', userRegister);

// Login route
router.post('/login', userLogin);

// Logout route
router.post('/logout', userLogout);

module.exports = router;
