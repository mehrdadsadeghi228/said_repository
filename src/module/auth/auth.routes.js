const express = require('express');
const AuthRoutes = express.Router();
const authController = require('./auth.controller');
const { validateAuthRegisterschema,validateAuthLoginschema } = require('./authvalidate');

// Registration route
AuthRoutes.post('/register', authController.register);

// Login route
AuthRoutes.post('/login',  authController.login);

// Logout route
//AuthRoutes.post('/logout', authController.logout);


// Refresh token route
//AuthRoutes.post('/refresh-token', authController.refreshToken);

// Forgot password route
AuthRoutes.post('/forgot-password', authController.forgotPassword);

// Reset password route
AuthRoutes.post('/reset-password', authController.resetPassword);

module.exports = {
    AuthRoutes
};
