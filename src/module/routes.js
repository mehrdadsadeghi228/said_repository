const express = require('express');
const { AuthRoutes } = require('./auth/auth.routes');
const router = express.Router();


router.use("/auth",AuthRoutes)

module.exports={
    router
}