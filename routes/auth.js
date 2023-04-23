// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/login', authController.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), authController.getProfile);

module.exports = router;
