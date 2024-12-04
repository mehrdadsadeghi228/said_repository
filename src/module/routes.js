const express = require('express');
const { AuthRoutes } = require('./auth/auth.routes');
const { CerRoutes } = require('./cer/cer.routes');
const { MenuRouter } = require('./menu/menu.route');
const router = express.Router();


router.use("/auth",AuthRoutes)
router.use("/cer",CerRoutes)
router.use(MenuRouter)
module.exports={
    router
}