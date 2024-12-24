const express = require('express');
const AuthRoutes = express.Router();
const authController = require('./auth.controller');
const { validateAuthLoginschema } = require('./authvalidate');

// Registration route
AuthRoutes.post('/register', authController.register);

// Login route
AuthRoutes.post('/login', validateAuthLoginschema, authController.login);
AuthRoutes.post('/logout', validateAuthLoginschema, authController.logOut);

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
