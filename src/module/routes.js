const express = require('express');
const { AuthRoutes } = require('./auth/auth.routes');
const { CerRoutes } = require('./cer/cer.routes');
const { MenuRouter } = require('./menu/menu.route');
const router = express.Router();

router.use(MenuRouter)

//router.use("/auth",AuthRoutes)
router.use("/cer",CerRoutes)
module.exports={
    router
}