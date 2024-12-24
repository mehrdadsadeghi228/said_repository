const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const { router } = require('./src/module/routes');
const SwaggerConfig = require('./src/config/swagger.config');
const cors=require("cors");
const morgan = require('morgan');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const { NotFoundHandler } = require('./src/utills/common/exception/not-found.handler');
const { AllExceptionHandler } = require('./src/utills/common/exception/all-exception.handler');

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware for serving static files
SwaggerConfig(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessions({
    secret:process.env.SECRESTKEYFORSEASION,
    saveUninitialized:true,
    cookie: { maxAge:Number( process.env.ONEDAY) },
    resave: false
    }));
require('./src/config/mongoose.config');
app.use(cors());
// Routes

app.use(cookieParser());
app.use(router);
app.use(morgan("dev"));
app.use(morgan("common"));
NotFoundHandler(app);
AllExceptionHandler(app);
// Start server
app.listen(PORT,ip, () => {
    console.log(`Server running on port : ${PORT}`);
});
