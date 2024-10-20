const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { validateRegistration, validateLogin } = require('./auth.validator');

// Registration route
router.post('/register', validateRegistration, authController.register);

// Login route
router.post('/login', validateLogin, authController.login);

// Logout route
router.post('/logout', authController.logout);


// Refresh token route
router.post('/refresh-token', authController.refreshToken);

// Forgot password route
router.post('/forgot-password', authController.forgotPassword);

// Reset password route
router.post('/reset-password', authController.resetPassword);

module.exports = {
    AuthRoutes: router
};
