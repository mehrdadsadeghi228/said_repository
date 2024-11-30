
const express = require('express');
const menuController = require('./menu.controller');
const router = express.Router();

// Define the route for the menu module
router.get('/menu',menuController.getMenu);
router.get('/contact',menuController.getContactPage);
router.get('/about',menuController.getAboutPage);
router.post('/contact',menuController.postContactPage);


module.exports = {
    MenuRouter:router
};
