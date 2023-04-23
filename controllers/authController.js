// controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await user.verifyPassword(req.body.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};
