// controllers/usersController.js

// Import your User model here

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Replace with actual database query
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body); // Replace with actual database query
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
};
