"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routs_installer_1 = require("./routs-installer");
const logger_1 = require("./infrastractures/utils/logger");
const validator_1 = require("./infrastractures/utils/validator");
const config_1 = require("./infrastractures/config/config");
const path_1 = require("path");
const Joi = require('joi');
var express = require("express");
var cors = require("cors");
var app = express();
exports.app = app;
const passport = require('passport');
var exphbs = require('express-handlebars');
installTemplateEngine();
// Configuring server
app.use(express.json());
installStaticResponses();
installLogging();
installSecurityt();
installRequestsValidation();
new routs_installer_1.RouteInstaller(app);
function installTemplateEngine() {
    app.set('views', path_1.join(__dirname, 'views'));
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        helpers: {
            increment: (v) => v + 1,
        },
    }));
    app.set('view engine', 'handlebars');
}
function installRequestsValidation() {
    const productValidate = (req, res, next) => {
        const result = Joi.validate(req.body, validator_1.schema);
        if (result.error) {
            throw new Error(result.error.message);
        }
        next();
    };
    app.post("/api/products/", productValidate);
    app.put("/api/products/", productValidate);
}
function installSecurityt() {
    var login = require('./infrastractures/security/login-route');
    app.use(login.router);
    if (config_1.AUTH_ON === 'true') {
        console.log("Installing security");
        app.use("/api/products/", passport.authenticate('jwt', { session: false }));
    }
    const adminValidation = (req, res, next) => {
        const user = req.user;
        if (user.role != 'ADMIN') {
            res.sendStatus(403);
        }
        else {
            next();
        }
    };
    app.post("/api/products/", adminValidation);
    app.put("/api/products/", adminValidation);
}
function installLogging() {
    app.use((req, res, next) => {
        logger_1.logger.info(req.method + " " + req.url + " body:" + JSON.stringify(req.body, null, 4));
        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
}
function installStaticResponses() {
    const pathToStaticDir = path_1.join(__dirname, 'static');
    console.log("Static path", pathToStaticDir);
    app.use('/static', express.static(pathToStaticDir));
}
//# sourceMappingURL=app.js.map