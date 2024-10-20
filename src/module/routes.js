const express = require('express');
const { AuthRoutes } = require('./auth/auth.routes');
const router = express.Router();
router.use(AuthRoutes)
module.exports={
    router
}