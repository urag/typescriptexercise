"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routs_installer_1 = require("./routs-installer");
const logger_1 = require("./infrastractures/utils/logger");
// Server bootstrap file
var express = require("express");
var cors = require("cors");
var app = express();
exports.app = app;
const passport = require('passport');
var login = require('./infrastractures/security/login-route');
var PORT = 3000;
// Configuring server
app.use(express.json());
app.use((req, res, next) => {
    logger_1.logger.info(req.method + " " + req.url + " body:" + JSON.stringify(req.body, null, 4));
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(login.router);
app.use("/api/products/", passport.authenticate('jwt', { session: false }));
new routs_installer_1.RouteInstaller(app);
//# sourceMappingURL=app.js.map