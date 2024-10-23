const express = require('express');
const { AuthRoutes } = require('./auth/auth.routes');
const { CerRoutes } = require('./cer/cer.routes');
const router = express.Router();


router.use("/auth",AuthRoutes)
router.use(CerRoutes)
module.exports={
    router
}