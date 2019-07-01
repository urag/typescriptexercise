import { RouteInstaller } from './routs-installer';
import { logger } from "./infrastractures/utils/logger";
import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { User } from './buisneslogic/users/model/user';
import { schema } from "./infrastractures/utils/validator"
import { AUTH_ON } from "./infrastractures/config/config";
import { join } from "path";
const Joi = require('joi');
var express = require("express");
var cors = require("cors");
var app = express();
const passport = require('passport');
var exphbs = require('express-handlebars');

installTemplateEngine();

// Configuring server
app.use(express.json());

installStaticResponses();
installLogging();
installSecurityt();
installRequestsValidation();

new RouteInstaller(app);
export { app };

    function installTemplateEngine() {
        app.set('views', join(__dirname, 'views'));
        app.engine('handlebars', exphbs({
            defaultLayout: 'main',
            helpers: {
                increment: (v: number) => v + 1,
            },
        }));
        app.set('view engine', 'handlebars');
    }

function installRequestsValidation() {
    const productValidate = (req: Request, res: Response, next: NextFunction) => {
        const result = Joi.validate(req.body, schema);
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
    if (AUTH_ON === 'true') {
        console.log("Installing security");
        app.use("/api/products/", passport.authenticate('jwt', { session: false }));
    }
    const adminValidation = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;
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
    app.use((req: Request, res: Response, next: NextFunction) => {
        logger.info(req.method + " " + req.url + " body:" + JSON.stringify(req.body, null, 4));
        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
}

function installStaticResponses() {
    const pathToStaticDir = join(__dirname, 'static');
    console.log("Static path", pathToStaticDir);
    app.use('/static', express.static(pathToStaticDir));
}
