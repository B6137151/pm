const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { getProfile } = require('./controllers/authController');
require('./passport');

const app = express();

mongoose.connect('mongodb://localhost:27017/pmDB1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(passport.initialize());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
